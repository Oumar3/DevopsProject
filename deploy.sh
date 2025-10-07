#!/bin/bash

# Script de déploiement simple pour VPS
echo "🚀 Début du déploiement..."

# 1. Mise à jour du code
echo "📥 Git pull..."
git pull origin main

# 2. Arrêt des anciens conteneurs
echo "🛑 Arrêt des conteneurs..."
docker-compose -f docker-compose-prod.yml down

# 3. Construction des nouvelles images
echo "🔨 Construction des images..."
docker-compose -f docker-compose-prod.yml build --no-cache

# 4. Démarrage des nouveaux conteneurs
echo "🚀 Démarrage des conteneurs..."
docker-compose -f docker-compose-prod.yml up -d

# 5. Vérification
echo "🔍 Vérification des conteneurs..."
docker-compose -f docker-compose-prod.yml ps

# 6. Nettoyage
echo "🧹 Nettoyage des images non utilisées..."
docker image prune -f

echo "✅ Déploiement terminé avec succès!"