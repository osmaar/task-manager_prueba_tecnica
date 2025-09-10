/**
 * Interfaz del Modelo de Tarea
 *
 * Representa una entidad de tarea en la aplicación Task Manager.
 * Esta interfaz define la estructura para los objetos de tarea utilizados en toda la aplicación.
 *
 * @interface Task
 */
export interface Task {
  /**
   * Identificador único de la tarea
   * @type {string}
   */
  id: string;

  /**
   * Título de la tarea (requerido)
   * @type {string}
   */
  title: string;

  /**
   * Descripción detallada opcional de la tarea
   * @type {string | undefined}
   */
  description?: string;

  /**
   * Indica si la tarea está completada
   * @type {boolean}
   * @default false
   */
  completed: boolean;

  /**
   * Nivel de prioridad de la tarea
   * @type {'low' | 'medium' | 'high'}
   * @default 'medium'
   */
  priority: 'low' | 'medium' | 'high';

  /**
   * Fecha de creación de la tarea
   * @type {Date}
   */
  createdAt: Date;

  /**
   * Fecha de última actualización de la tarea
   * @type {Date}
   */
  updatedAt: Date;

  /**
   * Fecha límite opcional de la tarea
   * @type {Date | undefined}
   */
  dueDate?: Date;
}

/**
 * Interfaz para crear una nueva tarea (sin campos generados automáticamente)
 *
 * @interface CreateTaskRequest
 */
export interface CreateTaskRequest {
  /**
   * Título de la nueva tarea
   * @type {string}
   */
  title: string;

  /**
   * Descripción opcional para la nueva tarea
   * @type {string | undefined}
   */
  description?: string;

  /**
   * Nivel de prioridad para la nueva tarea
   * @type {'low' | 'medium' | 'high'}
   * @default 'medium'
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Fecha límite opcional para la nueva tarea
   * @type {Date | undefined}
   */
  dueDate?: Date;
}

/**
 * Interfaz para actualizar una tarea existente
 *
 * @interface UpdateTaskRequest
 */
export interface UpdateTaskRequest {
  /**
   * Título actualizado de la tarea
   * @type {string | undefined}
   */
  title?: string;

  /**
   * Descripción actualizada de la tarea
   * @type {string | undefined}
   */
  description?: string;

  /**
   * Estado de finalización actualizado
   * @type {boolean | undefined}
   */
  completed?: boolean;

  /**
   * Nivel de prioridad actualizado
   * @type {'low' | 'medium' | 'high' | undefined}
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Fecha límite actualizada
   * @type {Date | undefined}
   */
  dueDate?: Date;
}
