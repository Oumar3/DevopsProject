# Étape de construction (build stage)
FROM node:20-alpine AS builder

# Métadonnées du conteneur
LABEL maintainer="Oumar DevOps" \
      description="Frontend React application build"

# creer un utilisateur non-root avec groupe explicite
RUN addgroup -g 1001 appgroup
RUN adduser -D -u 1001 -G appgroup appuser

# Définir le répertoire de travail
WORKDIR /app

# Changement de propriétaire du répertoire de travail
RUN chown -R appuser:appgroup /app

# Passer à l'utilisateur non-root
USER appuser

# Copier d'abord les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances de production
RUN npm ci --only=production --silent

# Copier tout le code source avec bonnes permissions
COPY --chown=appuser:appgroup . .

# Construire l'application pour la production
RUN npm run build 