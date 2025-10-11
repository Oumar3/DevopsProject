#!/bin/bash

# Script de déploiement simple pour VPS
echo "Début du déploiement..."

# 1. Mise à jour du code
echo "Git pull..."
git stash
git pull origin main

# 2. Configuration des variables d'environnement
echo "Configuration des variables..."
echo "DOCKER_USERNAME=oumar1" > .env

# 3. Pull des nouvelles images
echo "Pull des nouvelles images..."
docker pull oumar1/frontend:latest
docker pull oumar1/backend:latest

# 4. Arrêt des anciens conteneurs
echo "Arrêt des conteneurs..."
docker compose -f docker-compose-prod.yml down

# 5. Démarrage des nouveaux conteneurs
echo "Démarrage des conteneurs..."
docker compose -f docker-compose-prod.yml up -d

# 6. Vérification
echo "Vérification des conteneurs..."
docker compose -f docker-compose-prod.yml ps

# 7. Nettoyage
echo "Nettoyage des images non utilisées..."
docker image prune -f

echo "Déploiement terminé avec succès!"