import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskListComponent } from './components/task-list.component';

/**
 * Componente Principal de la Aplicación
 *
 * Componente raíz de la aplicación Task Manager. Proporciona el layout principal
 * y contiene el componente de lista de tareas. Incluye toolbar con branding
 * y navegación básica.
 *
 * @component AppComponent
 * @author osmar lópez
 *
 * @example
 * ```html
 * <!-- Se renderiza automáticamente como root component -->
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TaskListComponent,
  ],
  template: `
    <div class="app-container">
      <!-- Barra de navegación superior -->
      <mat-toolbar color="primary" class="main-toolbar">
        <div class="toolbar-content">
          <div class="brand-section">
            <mat-icon class="brand-icon">assignment</mat-icon>
            <span class="brand-title">{{ applicationTitle }}</span>
          </div>
        </div>
      </mat-toolbar>

      <!-- Contenido principal -->
      <main class="main-content">
        <div class="content-wrapper">
          <!-- Componente principal de lista de tareas -->
          <app-task-list></app-task-list>
        </div>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <p>
            <mat-icon>code</mat-icon>
            Desarrollado con Angular 19 + Material Design
          </p>
          <p class="version-info">
            Versión {{ applicationVersion }} |
            <a href="https://angular.io" target="_blank">Angular</a> |
            <a href="https://material.angular.io" target="_blank">Material</a>
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #fafafa;
      }

      /* Toolbar */
      .main-toolbar {
        box-shadow: 0 2px 8px rgba(80, 56, 218, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .toolbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }

      .brand-section {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .brand-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }

      .brand-title {
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .toolbar-actions {
        display: flex;
        gap: 8px;
      }

      /* Contenido principal */
      .main-content {
        flex: 1;
        overflow-x: hidden;
      }

      .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }

      /* Sección de bienvenida */
      .welcome-section {
        text-align: center;
        padding: 40px 20px;
        background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
        margin: 20px -16px;
        border-radius: 12px;
      }

      .welcome-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        font-size: 2.2rem;
        font-weight: 300;
        margin: 0 0 12px 0;
        color: #1976d2;
      }

      .welcome-title mat-icon {
        font-size: 2.2rem;
        width: 2.2rem;
        height: 2.2rem;
        color: #ff9800;
      }

      .welcome-subtitle {
        font-size: 1.1rem;
        color: #666;
        margin: 0;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.5;
      }

      /* Footer */
      .app-footer {
        background-color: #f5f5f5;
        border-top: 1px solid #e0e0e0;
        padding: 20px 16px;
        text-align: center;
        color: #666;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
      }

      .footer-content p {
        margin: 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 0.9rem;
      }

      .footer-content mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }

      .version-info a {
        color: #1976d2;
        text-decoration: none;
      }

      .version-info a:hover {
        text-decoration: underline;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .toolbar-content {
          padding: 0 8px;
        }

        .brand-title {
          font-size: 1rem;
        }

        .welcome-section {
          padding: 30px 16px;
          margin: 16px -16px;
        }

        .welcome-title {
          font-size: 1.8rem;
          flex-direction: column;
          gap: 8px;
        }

        .welcome-subtitle {
          font-size: 1rem;
        }

        .content-wrapper {
          padding: 0 8px;
        }

        .footer-content p {
          flex-direction: column;
          gap: 4px;
        }
      }

      @media (max-width: 480px) {
        .welcome-title {
          font-size: 1.5rem;
        }

        .toolbar-actions {
          gap: 4px;
        }
      }
    `,
  ],
})
export class AppComponent {
  /**
   * Título de la aplicación
   * @type {string}
   */
  readonly applicationTitle = 'Task Manager';

  /**
   * Versión de la aplicación
   * @type {string}
   */
  readonly applicationVersion = '1.0.0';
}
