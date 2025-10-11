#!/bin/bash

# Script de déploiement simple pour VPS
echo "Début du déploiement..."

# 1. Mise à jour du code
echo "Git pull..."
git stash push -m "Auto-stash avant déploiement $(date)"
git pull origin main

# 2. Configuration des variables d'environnement
echo "Configuration des variables..."
echo "DOCKER_USERNAME=oumar1" > .env

# 3. Pull des nouvelles images
echo "Pull des nouvelles images..."
docker pull oumar1/frontend:latest
docker pull oumar1/backend:latest

# 4. Détection de la version Docker Compose
if command -v "docker-compose" > /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version > /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "Erreur: Docker Compose non trouvé!"
    exit 1
fi

echo "Utilisation de: $DOCKER_COMPOSE_CMD"

# 5. Arrêt des anciens conteneurs
echo "Arrêt des conteneurs..."
$DOCKER_COMPOSE_CMD -f docker-compose-prod.yml down

#6 supprime le volume de frontend qui contient les fichiers buildés
echo "Suppression du volume frontend contenant les fichiers buildés..."
docker volume rm devopsproject_frontend-dist 2>/dev/null || echo "Volume frontend-dist déjà supprimé ou inexistant"

# 7. Démarrage des nouveaux conteneurs
echo "Démarrage des nouveaux conteneurs..."
$DOCKER_COMPOSE_CMD -f docker-compose-prod.yml up -d

# 8. Vérification
echo "Vérification des conteneurs..."
$DOCKER_COMPOSE_CMD -f docker-compose-prod.yml ps

# 9. Vérification que le frontend est bien mis à jour
echo "Vérification du volume frontend..."
docker run --rm -v devopsproject_frontend-dist:/data alpine ls -la /data | head -5

# 10. Nettoyage
echo "Nettoyage des images non utilisées..."
docker image prune -f

echo "Déploiement terminé avec succès!"