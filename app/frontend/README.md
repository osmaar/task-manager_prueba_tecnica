# Task Manager - Angular 19 Project

## 📋 Descripción

Este es el proyecto Angular 19 para la aplicación de gestión de tareas (Task Manager). Desarrollado como parte de una prueba técnica utilizando Angular Material para la interfaz de usuario.

## 🚀 Desarrollo

### Scripts Disponibles

```bash
# Iniciar servidor de desarrollo (dentro del contenedor Docker)
npm run docker

# Iniciar servidor de desarrollo (modo estándar)
npm start

# Construir el proyecto para producción
npm run build

# Ejecutar las pruebas unitarias
npm test

# Construir en modo watch
npm run watch

# Generar documentación con Compodoc
npm run compodoc

# Servir documentación
npm run compodoc:serve
```

### Configuración de Scripts

El archivo `package.json` incluye estos scripts personalizados:

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "docker": "ng serve --host 0.0.0.0 --port 4200",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "compodoc": "compodoc -p tsconfig.json",
    "compodoc:serve": "compodoc -p tsconfig.json -s"
  }
}
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── app/
│   ├── components/
│   │   ├── task-list/           # Lista de tareas
│   │   │   ├── task-list.component.ts
│   │   │   ├── task-list.component.html
│   │   │   └── task-list.component.scss
│   │   ├── task-item/           # Item individual de tarea
│   │   │   ├── task-item.component.ts
│   │   │   ├── task-item.component.html
│   │   │   └── task-item.component.scss
│   │   └── task-form/           # Formulario para crear tareas
│   │       ├── task-form.component.ts
│   │       ├── task-form.component.html
│   │       └── task-form.component.scss
│   ├── services/
│   │   └── task.service.ts      # Servicio CRUD para tareas
│   ├── models/
│   │   └── task.model.ts        # Interface/modelo de tarea
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── styles.scss
└── main.ts
```

### Componentes Principales

#### 1. TaskListComponent
- **Propósito**: Renderizar la lista completa de tareas
- **Características**:
  - Muestra todas las tareas
  - Filtra por estado (completadas/pendientes)
  - Maneja la eliminación de tareas

#### 2. TaskItemComponent
- **Propósito**: Representar una tarea individual
- **Características**:
  - Mostrar información de la tarea
  - Toggle para marcar como completada
  - Botón de eliminación

#### 3. TaskFormComponent
- **Propósito**: Crear nuevas tareas
- **Características**:
  - Formulario reactivo
  - Validación de campos
  - Emit de eventos para agregar tareas

### Servicios

#### TaskService
- **Métodos CRUD**:
  - `getTasks()`: Obtener todas las tareas
  - `addTask(task)`: Agregar nueva tarea
  - `updateTask(id, task)`: Actualizar tarea existente
  - `deleteTask(id)`: Eliminar tarea
  - `toggleComplete(id)`: Cambiar estado de completado

## 🎨 Angular Material

### Componentes Utilizados

- **MatCard**: Para contenedores de tareas
- **MatButton**: Botones de acción
- **MatInput**: Campos de entrada en formularios
- **MatCheckbox**: Para marcar tareas completadas
- **MatIcon**: Iconografía de la aplicación
- **MatList**: Lista de tareas
- **MatFormField**: Campos de formulario

### Tema

Configurado con el tema predeterminado de Angular Material con personalización en `styles.scss`.

## 📚 Documentación

### Generar Documentación

```bash
# Generar documentación estática
npm run compodoc

# Servir documentación en localhost:8080
npm run compodoc:serve
```

La documentación se genera en la carpeta `documentation/` e incluye:
- Componentes y sus propiedades
- Servicios y métodos
- Interfaces y modelos
- Dependencias del proyecto
- Gráfico de arquitectura

## 🔧 Configuración de Desarrollo

### Requisitos

- Node.js 18+
- Angular CLI 19
- Docker (para desarrollo en contenedor)

### Variables de Entorno

El proyecto utiliza configuraciones por ambiente en:
- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.prod.ts` (producción)

### Linting y Formateo

```bash
# Ejecutar linter
ng lint

# Formatear código
npx prettier --write src/
```

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar coverage
ng test --code-coverage
```

## 📦 Build y Deploy

```bash
# Build para producción
npm run build

# Build con configuración específica
ng build --configuration production
```

Los archivos se generan en la carpeta `dist/task-manager/`.

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej. `TaskListComponent`)
- **Servicios**: PascalCase + Service (ej. `TaskService`)
- **Interfaces**: PascalCase (ej. `Task`)
- **Métodos**: camelCase (ej. `addTask`)
- **Archivos**: kebab-case (ej. `task-list.component.ts`)

## 🤝 Contribución

1. Crear rama para feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commits descriptivos
3. Seguir las convenciones de código establecidas
4. Ejecutar tests antes de hacer push
5. Crear Pull Request

---

**Desarrollado con Angular 19 + Angular Material + TypeScript**