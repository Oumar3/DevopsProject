#!/bin/bash

# Entrypoint script pour le backend Node.js
# Ce script configure et démarre l'application backend

set -e

echo "🚀 Démarrage du backend DevOps Project..."

# Fonction pour vérifier les variables d'environnement
check_env_vars() {
    echo "📋 Vérification des variables d'environnement..."
    
    if [ -z "$NODE_ENV" ]; then
        export NODE_ENV="production"
        echo "⚠️  NODE_ENV non défini, utilisation de 'production' par défaut"
    fi
    
    if [ -z "$PORT" ]; then
        export PORT="3000"
        echo "⚠️  PORT non défini, utilisation du port 3000 par défaut"
    fi
    
    if [ -z "$MONGODB_URI" ]; then
        echo "❌ MONGODB_URI doit être défini"
        exit 1
    fi
    
    echo "✅ Variables d'environnement validées"
    echo "   - NODE_ENV: $NODE_ENV"
    echo "   - PORT: $PORT"
    echo "   - MONGODB_URI: configuré"
}

# Fonction pour créer les dossiers nécessaires
create_directories() {
    echo "📁 Création des dossiers nécessaires..."
    mkdir -p logs
    mkdir -p tmp
    echo "✅ Dossiers créés"
}

# Fonction pour vérifier les dépendances
check_dependencies() {
    echo "📦 Vérification des dépendances..."
    
    if [ ! -d "node_modules" ]; then
        echo "⚠️  node_modules non trouvé, installation des dépendances..."
        npm ci --only=production
    else
        echo "✅ Dépendances déjà installées"
    fi
}

# Fonction pour la gestion PM2
start_with_pm2() {
    echo "🔄 Démarrage avec PM2..."
    
    # Installer PM2 globalement si non présent
    if ! command -v pm2 &> /dev/null; then
        echo "📦 Installation de PM2..."
        npm install -g pm2
    fi
    
    # Arrêter les processus existants
    pm2 delete devops-backend 2>/dev/null || true
    
    # Démarrer avec la configuration PM2
    if [ "$NODE_ENV" = "production" ]; then
        pm2 start ecosystem.config.json --env production
    elif [ "$NODE_ENV" = "staging" ]; then
        pm2 start ecosystem.config.json --env staging
    else
        pm2 start ecosystem.config.json --env development
    fi
    
    # Sauvegarder la configuration PM2
    pm2 save
    
    # Afficher le statut
    pm2 status
    pm2 logs --lines 20
}

# Fonction pour démarrage simple (sans PM2)
start_simple() {
    echo "🚀 Démarrage simple avec Node.js..."
    exec node server.js
}

# Fonction principale
main() {
    echo "=========================================="
    echo "🎯 DevOps Project Backend Entrypoint"
    echo "=========================================="
    
    check_env_vars
    create_directories
    check_dependencies
    
    # Démarrage selon le mode
    if [ "${USE_PM2:-true}" = "true" ]; then
        start_with_pm2
    else
        start_simple
    fi
}

# Gestion des signaux pour un arrêt propre
trap 'echo "🛑 Arrêt du serveur..."; pm2 stop devops-backend; exit 0' SIGTERM SIGINT

# Exécution du script principal
main "$@"