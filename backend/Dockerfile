FROM python:3.12-slim

WORKDIR /app

# Instalar Node.js y npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar Serverless Framework globalmente
RUN npm install -g serverless

# Copiar archivos de configuración de Node.js
COPY package*.json ./
RUN npm install

# Copiar archivos de Python y requisitos
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer puerto para serverless offline
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["serverless", "offline", "--host", "0.0.0.0", "--port", "3000"]