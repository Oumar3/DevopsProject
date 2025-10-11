# Build stage seulement - pas de nginx
FROM node:20-alpine

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer toutes les dépendances
RUN npm install

# RUN apt-get install -y curl

# Installer curl sur Alpine
RUN apk add --no-cache curl

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build