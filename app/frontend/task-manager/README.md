# Task Manager - Prueba Técnica Angular 19

## Descripción del Proyecto

Esta es una **prueba técnica** que consiste en crear una aplicación de lista de tareas (Task Manager) utilizando **Angular 19** y **Angular Material**.

### 🎯 Objetivo de la Prueba

Desarrollar una aplicación web que permita:
- ✅ Agregar nuevas tareas
- ✅ Marcar tareas como completadas
- ❌ Eliminar tareas existentes
- 📋 Visualizar la lista completa de tareas

### 🏗️ Arquitectura Requerida

#### Componentes
- **`task-list`**: Componente para mostrar la lista de tareas
- **`task-item`**: Componente para representar cada tarea individual
- **`task-form`**: Componente para agregar nuevas tareas

#### Servicios
- **`task-service`**: Servicio para manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)

#### Tecnologías
- **Frontend**: Angular 19
- **UI Library**: Angular Material
- **Styling**: SCSS
- **Documentation**: Compodoc
- **Containerization**: Docker

---

## 🚀 Configuración del Entorno de Desarrollo

### Prerrequisitos
- Docker y Docker Compose instalados
- Git (opcional)

### 📦 Instalación y Ejecución

#### 1. Clonar o descargar el proyecto
```bash
git clone <repository-url>
cd prueba_angular
```

#### 2. Levantar entorno de desarrollo con Docker
```bash
# Comando para levantar el entorno completo de desarrollo
docker-compose up -d && docker exec -it prueba_angular_frontend bash
```

Este comando:
- Construye y levanta el contenedor Docker
- Te conecta automáticamente al contenedor para trabajar

#### 3. Dentro del contenedor - Primera vez
```bash
# Crear el proyecto Angular (solo la primera vez)
ng new task-manager --routing=true --style=scss --skip-git=true
cd task-manager

# Instalar Angular Material
ng add @angular/material

# Generar componentes
ng generate component components/task-list
ng generate component components/task-item  
ng generate component components/task-form

# Generar servicio
ng generate service services/task

# Instalar Compodoc para documentación
npm install -g @compodoc/compodoc
```

#### 4. Ejecutar la aplicación en desarrollo
```bash
ng serve --host 0.0.0.0 --port 4200
```

#### 5. Acceder a la aplicación
- **Aplicación**: http://localhost:4200
- **Documentación**: Generar con `compodoc -p tsconfig.json -s`

---

## 🐳 Comandos Docker Útiles

### Comando principal de desarrollo
```bash
# Levantar entorno de desarrollo
docker-compose up -d && docker exec -it prueba_angular_frontend bash
```

### Comandos adicionales
```bash
# Solo levantar contenedor
docker-compose up -d

# Entrar al contenedor manualmente
docker exec -it prueba_angular_frontend bash

# Ver logs del contenedor
docker-compose logs -f prueba_angular_frontend

# Detener servicios
docker-compose down

# Reconstruir contenedor
docker-compose up -d --build
```

---

## 📁 Estructura del Proyecto

```
prueba_angular/
├── app/
│   └── frontend/
│       └── task-manager/          # Proyecto Angular
│           ├── src/
│           │   ├── app/
│           │   │   ├── components/
│           │   │   │   ├── task-list/
│           │   │   │   ├── task-item/
│           │   │   │   └── task-form/
│           │   │   └── services/
│           │   │       └── task.service.ts
│           │   └── ...
│           └── ...
├── docker-compose.yml
├── Dockerfile
├── PruebaTécnica_Angular.pdf     # Especificaciones originales
└── README.md
```

---

## 📚 Documentación con Compodoc

### Generar documentación
```bash
# Generar documentación estática
compodoc -p tsconfig.json

# Servir documentación en desarrollo
compodoc -p tsconfig.json -s
```

La documentación estará disponible en: http://localhost:8080

---

## 🔧 Tecnologías Utilizadas

| Tecnología       | Versión | Propósito                |
| ---------------- | ------- | ------------------------ |
| Angular          | 19.x    | Framework principal      |
| Angular Material | Latest  | Componentes UI           |
| TypeScript       | Latest  | Lenguaje de programación |
| SCSS             | -       | Estilos                  |
| Docker           | -       | Containerización         |
| Node.js          | 22      | Runtime                  |
| Compodoc         | Latest  | Documentación            |

---

## 📝 Notas de Desarrollo

- El contenedor mantiene el proyecto persistente en `./app/frontend/`
- Puedes instalar paquetes adicionales desde dentro del contenedor
- Los cambios se reflejan automáticamente gracias al volume mount
- El puerto 4200 está expuesto para acceso desde el host

---

## 🤝 Contribución

Este es un proyecto de prueba técnica. Para cualquier consulta o mejora:

1. Fork del proyecto
2. Crear rama para features (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

**Desarrollado como prueba técnica - Angular 19 + Angular Material + Docker**
