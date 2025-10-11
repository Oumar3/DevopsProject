FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
# Installer curl sur Alpine
RUN apk add --no-cache curl
# RUN apt-get update && apt-get install -y curl

RUN npm install pm2 -g

COPY . .

EXPOSE 5000