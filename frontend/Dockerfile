FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de configuración primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción con Nginx para servir la aplicación estática
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Crear archivo de configuración de Nginx
RUN mkdir -p /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]