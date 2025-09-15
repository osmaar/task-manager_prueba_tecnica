FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar Angular CLI versión compatible con Angular 19
RUN npm install -g @angular/cli@19 && npm install -g @compodoc/compodoc

# Exponer el puerto 4200 para la aplicación Angular y 4300 para Compodoc
EXPOSE 4200 4300

# Mantiene el contenedor vivo
CMD [ "tail", "-f", "/dev/null" ]
