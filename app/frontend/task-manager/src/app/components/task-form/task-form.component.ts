import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CreateTaskRequest, Task, UpdateTaskRequest } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

/**
 * Componente Formulario de Tarea
 *
 * Un componente standalone para crear nuevas tareas. Este componente proporciona un formulario reactivo
 * con validación para la creación de tareas incluyendo título, descripción, prioridad y fecha límite.
 *
 * @component TaskFormComponent
 * @standalone
 *
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  /**
   * Formulario reactivo para creación de tareas
   * @private
   */
  private readonly formBuilder = inject(FormBuilder);

  /**
   * Servicio de tareas para crear tareas
   * @private
   */
  private readonly taskService = inject(TaskService);

  /**
   * Emisor de evento de salida para cuando una tarea se crea exitosamente
   * @event taskCreated
   * @type {EventEmitter<Task>}
   */
  readonly taskCreated = output<Task>();

  /**
   * Emisor de evento de salida para cuando una tarea se actualiza exitosamente
   * @event taskUpdated
   * @type {EventEmitter<Task>}
   */
  readonly taskUpdated = output<Task>();

  /**
   * Emisor de evento de salida para cuando se cancela la edición
   * @event editCancelled
   * @type {EventEmitter<void>}
   */
  readonly editCancelled = output<void>();

  /**
   * Indicador de estado de carga
   * @type {boolean}
   */
  isLoading = false;

  /**
   * Indicador de modo de edición
   * @type {boolean}
   */
  isEditMode = false;

  /**
   * ID de la tarea en edición (si aplica)
   * @type {string | null}
   */
  editingTaskId: string | null = null;

  /**
   * Grupo de formulario reactivo para creación/edición de tareas
   * @type {FormGroup}
   */
  taskForm: FormGroup;

  constructor() {
    this.taskForm = this.initializeForm();
  }

  /**
   * Inicializar el formulario para modo de edición con datos de tarea existente
   *
   * @param {Task} task - La tarea a editar
   * @returns {void}
   */
  initializeEditMode(task: Task): void {
    this.isEditMode = true;
    this.editingTaskId = task.id;
    
    this.taskForm.patchValue({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || null
    });
  }

  /**
   * Salir del modo de edición y reiniciar el formulario
   *
   * @returns {void}
   */
  cancelEdit(): void {
    this.isEditMode = false;
    this.editingTaskId = null;
    this.resetForm();
    this.editCancelled.emit();
  }

  /**
   * Inicializar el formulario reactivo con reglas de validación
   *
   * @private
   * @returns {FormGroup} El grupo de formulario inicializado
   */
  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.maxLength(500)]],
      priority: ['medium', Validators.required],
      dueDate: [null],
    });
  }

  /**
   * Verificar si un campo del formulario es inválido y ha sido tocado
   *
   * @param {string} fieldName - El nombre del campo del formulario a verificar
   * @returns {boolean} True si el campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Manejar el envío del formulario
   *
   * Crea una nueva tarea o actualiza una existente usando los datos del formulario.
   * Incluye validación del formulario y manejo del estado de carga.
   *
   * @returns {Promise<void>} Promise que se resuelve cuando se completa la operación
   */
  async onSubmit(): Promise<void> {
    if (this.taskForm.valid && !this.isLoading) {
      try {
        this.isLoading = true;

        const formValue = this.taskForm.value;

        if (this.isEditMode && this.editingTaskId) {
          // Modo edición: Actualizar tarea existente
          const updateRequest: UpdateTaskRequest = {
            title: formValue.title.trim(),
            description: formValue.description?.trim() || undefined,
            priority: formValue.priority,
            dueDate: formValue.dueDate || undefined,
          };

          const updatedTask = await this.taskService.updateTask(this.editingTaskId, updateRequest);

          if (updatedTask) {
            this.taskUpdated.emit(updatedTask);
            this.cancelEdit();
          }
        } else {
          // Modo creación: Crear nueva tarea
          const taskRequest: CreateTaskRequest = {
            title: formValue.title.trim(),
            description: formValue.description?.trim() || undefined,
            priority: formValue.priority,
            dueDate: formValue.dueDate || undefined,
          };

          const newTask = await this.taskService.createTask(taskRequest);
          this.taskCreated.emit(newTask);
          this.resetForm();
        }
      } catch (error) {
        console.error('Error processing task:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Reiniciar el formulario a su estado inicial
   *
   * Limpia todos los campos del formulario y reinicia el estado de validación.
   *
   * @returns {void}
   */
  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: null,
    });

    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
  }

  /**
   * Marcar todos los campos del formulario como tocados para activar la visualización de validación
   *
   * @private
   * @returns {void}
   */
  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Obtener control del formulario para acceso desde el template
   *
   * @param {string} controlName - Nombre del control del formulario
   * @returns {AbstractControl | null} El control del formulario o null
   */
  getFormControl(controlName: string) {
    return this.taskForm.get(controlName);
  }
}