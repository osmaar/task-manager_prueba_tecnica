FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar Angular CLI versión compatible con Angular 19
RUN npm install -g @angular/cli@19

# Exponer el puerto 4200
EXPOSE 4200

# Mantiene el contenedor vivo
CMD [ "tail", "-f", "/dev/null" ]
