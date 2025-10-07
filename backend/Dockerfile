FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
EXPOSE 5000

#demarrer l'application avec pm2
CMD ["pm2-runtime", "start", "npm", "--", "start"]