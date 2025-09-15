import { Component, inject, signal, computed, viewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

/**
 * Componente Lista de Tareas
 *
 * Componente standalone que muestra y gestiona una lista de tareas con funcionalidades
 * de filtrado, estadísticas y operaciones CRUD. Incluye formulario para crear nuevas tareas
 * y maneja la visualización según diferentes filtros (todas, completadas, pendientes).
 *
 * @component TaskListComponent
 * @standalone
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    TaskItemComponent,
    TaskFormComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  /**
   * Servicio de tareas inyectado
   * @readonly
   */
  readonly taskService = inject(TaskService);

  /**
   * Referencia al componente del formulario de tareas
   * @private
   */
  private readonly taskFormRef = viewChild.required(TaskFormComponent);

  /**
   * Filtro actual aplicado a las tareas
   * @type {WritableSignal<string>}
   */
  readonly currentFilter = signal<'all' | 'pending' | 'completed'>('all');

  /**
   * Estado de carga
   * @type {boolean}
   */
  isLoading = false;

  /**
   * Señal computada de tareas filtradas según el filtro actual
   * @readonly
   * @returns {Signal<Task[]>} Array de tareas filtradas
   */
  readonly filteredTasks = computed(() => {
    const filter = this.currentFilter();
    const tasks = this.taskService.tasks();

    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  });

  /**
   * Obtiene el filtro actual
   *
   * @returns {'all' | 'pending' | 'completed'} El filtro actualmente aplicado
   */
  getCurrentFilter(): 'all' | 'pending' | 'completed' {
    return this.currentFilter();
  }

  /**
   * Establece un nuevo filtro para las tareas
   *
   * @param {string} filter - El filtro a aplicar ('all', 'pending', 'completed')
   * @returns {void}
   */
  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.currentFilter.set(filter);
  }

  /**
   * Obtiene las tareas filtradas según el filtro actual
   *
   * @returns {Task[]} Array de tareas filtradas
   */
  getFilteredTasks(): Task[] {
    return this.filteredTasks();
  }

  /**
   * Calcula el porcentaje de completitud de las tareas
   *
   * @returns {number} Porcentaje de tareas completadas (0-100)
   */
  getCompletionPercentage(): number {
    const total = this.taskService.totalTasksCount();
    if (total === 0) return 0;

    const completed = this.taskService.completedTasksCount();
    return Math.round((completed / total) * 100);
  }

  /**
   * Obtiene el icono correspondiente al filtro actual
   *
   * @returns {string} Nombre del icono de Material Design
   */
  getFilterIcon(): string {
    switch (this.currentFilter()) {
      case 'completed':
        return 'check_circle';
      case 'pending':
        return 'schedule';
      default:
        return 'list';
    }
  }

  /**
   * Obtiene el título correspondiente al filtro actual
   *
   * @returns {string} Título descriptivo del filtro
   */
  getFilterTitle(): string {
    switch (this.currentFilter()) {
      case 'completed':
        return 'Tareas Completadas';
      case 'pending':
        return 'Tareas Pendientes';
      default:
        return 'Todas las Tareas';
    }
  }

  /**
   * Obtiene el icono para el estado vacío
   *
   * @returns {string} Nombre del icono para mostrar cuando no hay tareas
   */
  getEmptyStateIcon(): string {
    switch (this.currentFilter()) {
      case 'completed':
        return 'check_circle_outline';
      case 'pending':
        return 'schedule';
      default:
        return 'assignment';
    }
  }

  /**
   * Obtiene el título para el estado vacío
   *
   * @returns {string} Título descriptivo cuando no hay tareas
   */
  getEmptyStateTitle(): string {
    switch (this.currentFilter()) {
      case 'completed':
        return 'No hay tareas completadas';
      case 'pending':
        return 'No hay tareas pendientes';
      default:
        return 'No hay tareas';
    }
  }

  /**
   * Obtiene el mensaje para el estado vacío
   *
   * @returns {string} Mensaje descriptivo cuando no hay tareas
   */
  getEmptyStateMessage(): string {
    switch (this.currentFilter()) {
      case 'completed':
        return 'Aún no has completado ninguna tarea. ¡Sigue trabajando!';
      case 'pending':
        return '¡Excelente! Has completado todas tus tareas.';
      default:
        return 'Comienza agregando tu primera tarea usando el formulario superior.';
    }
  }

  /**
   * Maneja la creación de una nueva tarea
   *
   * @param {Task} task - La tarea recién creada
   * @returns {void}
   */
  onTaskCreated(task: Task): void {
    // La tarea ya se agregó al servicio mediante el formulario
    console.log('Nueva tarea creada:', task.title);
    alert(`Tarea "${task.title}" creada exitosamente`);
  }

  /**
   * Maneja el cambio de estado de una tarea
   *
   * @param {Task} task - La tarea que cambió de estado
   * @returns {void}
   */
  onTaskToggled(task: Task): void {
    console.log(
      'Tarea actualizada:',
      task.title,
      'Completada:',
      task.completed
    );
  }

  /**
   * Maneja la eliminación de una tarea
   *
   * @param {string} taskId - ID de la tarea eliminada
   * @returns {void}
   */
  onTaskDeleted(taskId: string): void {
    console.log('Tarea eliminada con ID:', taskId);
  }

  /**
   * Maneja la solicitud de edición de una tarea
   *
   * @param {Task} task - La tarea a editar
   * @returns {void}
   */
  onTaskEdit(task: Task): void {
    console.log('Tarea a editar:', task.title);
    const taskForm = this.taskFormRef();
    if (taskForm) {
      taskForm.initializeEditMode(task);
      this.scrollToForm();
    }
  }

  /**
   * Maneja la actualización exitosa de una tarea
   *
   * @param {Task} task - La tarea actualizada
   * @returns {void}
   */
  onTaskUpdated(task: Task): void {
    console.log('Tarea actualizada:', task.title);
    alert(`Tarea "${task.title}" actualizada exitosamente`);
  }

  /**
   * Maneja la cancelación de la edición
   *
   * @returns {void}
   */
  onEditCancelled(): void {
    console.log('Edición cancelada');
  }

  /**
   * Desplaza la página hacia el formulario de tareas
   *
   * @private
   * @returns {void}
   */
  private scrollToForm(): void {
    setTimeout(() => {
      const formSection = document.querySelector('.form-section');
      if (formSection) {
        formSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }, 100);
  }

  /**
   * Limpia todas las tareas después de confirmación
   *
   * @returns {Promise<void>} Promise que se resuelve cuando se limpian las tareas
   */
  async clearAllTasks(): Promise<void> {
    const confirmed = confirm(
      '¿Estás seguro de que quieres eliminar todas las tareas? Esta acción no se puede deshacer.'
    );

    if (confirmed) {
      try {
        this.isLoading = true;
        await this.taskService.clearAllTasks();
        console.log('Todas las tareas han sido eliminadas');
      } catch (error) {
        console.error('Error al limpiar tareas:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  /**
   * Función de seguimiento para ngFor optimizada
   *
   * @param {number} index - Índice del elemento
   * @param {Task} task - Objeto de tarea
   * @returns {string} ID único de la tarea
   */
  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
