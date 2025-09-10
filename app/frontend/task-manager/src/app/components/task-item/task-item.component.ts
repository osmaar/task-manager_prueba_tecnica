import { Component, input, output, inject } from '@angular/core';
import { DatePipe, NgClass, TitleCasePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

/**
 * Componente Item de Tarea
 *
 * Un componente standalone que muestra una tarea individual con características interactivas.
 * Soporta alternar completado de tarea, edición y eliminación con estilo Material Design.
 *
 * @component TaskItemComponent
 * @standalone
 */
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    TitleCasePipe,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  /**
   * Servicio de tareas para operaciones de tareas
   * @private
   */
  private readonly taskService = inject(TaskService);

  /**
   * Entrada: Datos de la tarea a mostrar
   * @type {InputSignal<Task>}
   */
  readonly task = input.required<Task>();

  /**
   * Salida: Se emite cuando se alterna el completado de la tarea
   * @event taskToggled
   * @type {OutputEmitterRef<Task>}
   */
  readonly taskToggled = output<Task>();

  /**
   * Salida: Se emite cuando se elimina la tarea
   * @event taskDeleted
   * @type {OutputEmitterRef<string>}
   */
  readonly taskDeleted = output<string>();

  /**
   * Salida: Se emite cuando se solicita editar la tarea
   * @event taskEdit
   * @type {OutputEmitterRef<Task>}
   */
  readonly taskEdit = output<Task>();

  /**
   * Estado de carga para operaciones asíncronas
   * @type {boolean}
   */
  isLoading = false;

  /**
   * Alternar el estado de completado de la tarea
   *
   * Actualiza el estado de completado de la tarea y emite el evento taskToggled.
   * Maneja el estado de carga y escenarios de error.
   *
   * @returns {Promise<void>} Promise que se resuelve cuando se completa el alternado
   */
  async onToggleComplete(): Promise<void> {
    if (this.isLoading) return;

    try {
      this.isLoading = true;
      const updatedTask = await this.taskService.toggleTaskCompletion(
        this.task().id
      );

      if (updatedTask) {
        this.taskToggled.emit(updatedTask);
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Eliminar la tarea actual
   *
   * Elimina la tarea y emite el evento taskDeleted con el ID de la tarea.
   * Incluye confirmación y manejo de errores.
   */
  async onDeleteTask(): Promise<void> {
    if (this.isLoading) return;

    // Simple confirmation (in a real app, use a proper dialog)
    if (!confirm(`Are you sure you want to delete "${this.task().title}"?`)) {
      return;
    }

    try {
      this.isLoading = true;
      const deleted = await this.taskService.deleteTask(this.task().id);

      if (deleted) {
        this.taskDeleted.emit(this.task().id);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Verificar si la tarea está vencida
   *
   * Compara la fecha límite de la tarea con la fecha actual para determinar si está vencida.
   *
   * @returns {boolean} True si la tarea está vencida
   */
  isOverdue(): boolean {
    if (!this.task().dueDate || this.task().completed) {
      return false;
    }

    const now = new Date();
    const dueDate = new Date(this.task().dueDate!);
    return dueDate < now;
  }

  /**
   * Obtener icono de prioridad basado en la prioridad de la tarea
   *
   * @returns {string} Nombre del icono Material para el nivel de prioridad
  ``
   */
  getPriorityIcon(): string {
    switch (this.task().priority) {
      case 'high':
        return 'keyboard_arrow_up';
      case 'medium':
        return 'remove';
      case 'low':
        return 'keyboard_arrow_down';
      default:
        return 'remove';
    }
  }

  /**
   * Obtener texto del tooltip de prioridad
   *
   * @returns {string} Tooltip descriptivo para el nivel de prioridad
   */
  getPriorityTooltip(): string {
    switch (this.task().priority) {
      case 'high':
        return 'Alta prioridad de la tarea';
      case 'medium':
        return 'Prioridad media de la tarea';
      case 'low':
        return 'Baja prioridad de la tarea';
      default:
        return 'Prioridad de la tarea desconocida';
    }
  }

  /**
   * Obtener texto de prioridad en español
   *
   * @returns {string} Texto de prioridad en español
   */
  getPriorityText(): string {
    switch (this.task().priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Desconocida';
    }
  }
}
