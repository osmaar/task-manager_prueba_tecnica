import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../models/task.model';

/**
 * Servicio de Tareas - Operaciones CRUD
 *
 * Este servicio maneja todas las operaciones relacionadas con tareas incluyendo Crear, Leer, Actualizar y Eliminar.
 * Utiliza Angular Signals para gestión reactiva del estado y proporciona APIs basadas en Observable y Signal.
 *
 * @class TaskService
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Signal privada que contiene todas las tareas
   * @private
   */
  private readonly _tasks = signal<Task[]>([]);

  /**
   * BehaviorSubject privado para suscripciones basadas en Observable
   * @private
   */
  private readonly _tasks$ = new BehaviorSubject<Task[]>([]);

  /**
   * Contador privado para generar IDs únicos de tareas
   * @private
   */
  private _nextId = 1;

  /**
   * Signal pública de solo lectura para acceder a las tareas
   * @readonly
   * @returns {Signal<Task[]>} Todas las tareas
   */
  public readonly tasks = this._tasks.asReadonly();

  /**
   * Flujo Observable de todas las tareas
   * @readonly
   * @returns {Observable<Task[]>} Observable de todas las tareas
   */
  public readonly tasks$: Observable<Task[]> = this._tasks$.asObservable();

  /**
   * Signal computada para el conteo de tareas completadas
   * @readonly
   * @returns {Signal<number>} Número de tareas completadas
   */
  public readonly completedTasksCount = computed(
    () => this._tasks().filter((task) => task.completed).length
  );

  /**
   * Signal computada para el conteo de tareas pendientes
   * @readonly
   * @returns {Signal<number>} Número de tareas pendientes
   */
  public readonly pendingTasksCount = computed(
    () => this._tasks().filter((task) => !task.completed).length
  );

  /**
   * Signal computada para el conteo total de tareas
   * @readonly
   * @returns {Signal<number>} Número total de tareas
   */
  public readonly totalTasksCount = computed(() => this._tasks().length);

  constructor() {
    this.initializeSampleData();
  }

  /**
   * Inicializar el servicio con datos de ejemplo para demostración
   * @private
   * @returns {void}
   */
  private initializeSampleData(): void {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Configurar Angular Material',
        description: 'Instalar y configurar Angular Material en el proyecto',
        completed: true,
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        title: 'Crear componentes de tareas',
        description:
          'Desarrollar los componentes de lista de tareas, elemento de tarea y formulario de tarea',
        completed: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 3600000),
        dueDate: new Date(Date.now() + 259200000),
      },
    ];

    this._tasks.set(sampleTasks);
    this._tasks$.next(sampleTasks);
    this._nextId = 3;
  }

  /**
   * Crear una nueva tarea
   *
   * @param {CreateTaskRequest} taskRequest - Los datos de la tarea a crear
   * @returns {Promise<Task>} Promise que se resuelve con la tarea creada
   */
  async createTask(taskRequest: CreateTaskRequest): Promise<Task> {
    const now = new Date();
    const newTask: Task = {
      id: this._nextId.toString(),
      title: taskRequest.title,
      description: taskRequest.description || '',
      completed: false,
      priority: taskRequest.priority || 'medium',
      createdAt: now,
      updatedAt: now,
      dueDate: taskRequest.dueDate,
    };

    this._nextId++;
    const updatedTasks = [...this._tasks(), newTask];
    this._tasks.set(updatedTasks);
    this._tasks$.next(updatedTasks);

    return Promise.resolve(newTask);
  }

  /**
   * Actualizar una tarea existente
   *
   * @param {string} id - El ID de la tarea a actualizar
   * @param {UpdateTaskRequest} updateRequest - Los datos a actualizar
   * @returns {Promise<Task | null>} Promise que se resuelve con la tarea actualizada o null si no se encuentra
   */
  async updateTask(
    id: string,
    updateRequest: UpdateTaskRequest
  ): Promise<Task | null> {
    const tasks = this._tasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return Promise.resolve(null);
    }

    const existingTask = tasks[taskIndex];
    const updatedTask: Task = {
      ...existingTask,
      ...updateRequest,
      updatedAt: new Date(),
    };

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;

    this._tasks.set(updatedTasks);
    this._tasks$.next(updatedTasks);

    return Promise.resolve(updatedTask);
  }

  /**
   * Eliminar una tarea por ID
   *
   * @param {string} id - El ID de la tarea a eliminar
   * @returns {Promise<boolean>} Promise que se resuelve con true si se eliminó, false si no se encontró
   */
  async deleteTask(id: string): Promise<boolean> {
    const tasks = this._tasks();
    const filteredTasks = tasks.filter((t) => t.id !== id);

    if (filteredTasks.length === tasks.length) {
      return Promise.resolve(false);
    }

    this._tasks.set(filteredTasks);
    this._tasks$.next(filteredTasks);

    return Promise.resolve(true);
  }

  /**
   * Alternar el estado de completado de una tarea
   *
   * @param {string} id - El ID de la tarea a alternar
   * @returns {Promise<Task | null>} Promise que se resuelve con la tarea actualizada o null si no se encuentra
   */
  async toggleTaskCompletion(id: string): Promise<Task | null> {
    const task = this._tasks().find((t) => t.id === id);
    if (!task) {
      return Promise.resolve(null);
    }

    return this.updateTask(id, { completed: !task.completed });
  }

  /**
   * Limpiar todas las tareas
   *
   * @returns {Promise<void>} Promise que se resuelve cuando se limpian todas las tareas
   */
  async clearAllTasks(): Promise<void> {
    this._tasks.set([]);
    this._tasks$.next([]);
    this._nextId = 1;
    return Promise.resolve();
  }
}
