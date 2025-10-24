# 🚀 Environnement de Développement avec Synchronisation

## 📁 Configuration des Volumes Synchronisés

Votre environnement de développement est configuré avec des **volumes synchronisés** entre votre PC et les conteneurs Docker.

### 🔄 Synchronisation Frontend
```yaml
volumes:
  - ./frontend/src:/app/src                    # Code source React
  - ./frontend/public:/app/public              # Assets publics
  - ./frontend/index.html:/app/index.html      # Page principale
  - ./frontend/package.json:/app/package.json  # Dépendances
  - ./frontend/.env:/app/.env                  # Variables d'environnement
```

### 🔄 Synchronisation Backend
```yaml
volumes:
  - ./backend/src:/app/src                     # Code source Express
  - ./backend/server.js:/app/server.js         # Serveur principal
  - ./backend/.env:/app/.env                   # Configuration
```

## 🚀 Lancement Rapide

### Windows (Batch)
```bash
./start-dev.bat
```

### Windows (PowerShell)
```powershell
./start-dev.ps1
```

### Manuel
```bash
docker-compose -f docker-compose-dev.yml up --build
```

## 🌐 Services Disponibles

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React avec Hot Module Replacement |
| **Backend** | http://localhost:5000 | API Express avec Nodemon |
| **MongoDB** | localhost:27017 | Base de données |

## 🔥 Fonctionnalités de Développement

### ✅ Hot Reload Activé
- **Frontend** : Modifications automatiquement reflétées dans le navigateur
- **Backend** : Redémarrage automatique avec Nodemon
- **Pas de rebuild** nécessaire pour les modifications de code

### 📂 Fichiers Synchronisés
Tous les fichiers suivants sont automatiquement synchronisés :
- ✅ Code source React (`/src/`)
- ✅ Assets publics (`/public/`)
- ✅ Configuration Vite (`vite.config.js`)
- ✅ Variables d'environnement (`.env`)
- ✅ Code backend Express (`/src/`, `server.js`)

### 🚀 Performance Optimisée
- **node_modules** isolés dans des volumes anonymes
- **Polling activé** pour la détection des changements
- **WebSocket HMR** sur port 24678

## 📋 Commandes Utiles

```bash
# Voir les logs en temps réel
docker-compose -f docker-compose-dev.yml logs -f

# Voir les logs d'un service spécifique
docker-compose -f docker-compose-dev.yml logs -f frontend
docker-compose -f docker-compose-dev.yml logs -f backend

# Rebuilder complètement
docker-compose -f docker-compose-dev.yml up --build --force-recreate

# Arrêter tous les services
docker-compose -f docker-compose-dev.yml down

# Nettoyer complètement
docker-compose -f docker-compose-dev.yml down -v --remove-orphans
```

## 🔧 Dépannage

### Frontend ne se recharge pas ?
1. Vérifier que le port 24678 (WebSocket) est accessible
2. S'assurer que `CHOKIDAR_USEPOLLING=true` est défini
3. Redémarrer le conteneur frontend

### Backend ne redémarre pas ?
1. Vérifier que nodemon est installé dans le conteneur
2. S'assurer que les fichiers sont bien synchronisés
3. Voir logs : `docker-compose -f docker-compose-dev.yml logs backend`

### Problèmes de permissions ?
```bash
# Sur Linux/Mac
sudo chown -R $USER:$USER ./frontend ./backend

# Les conteneurs utilisent l'utilisateur 1001
```

## 🎯 Workflow de Développement

1. **Lancer l'environnement** avec `start-dev.bat` ou `start-dev.ps1`
2. **Modifier le code** sur votre PC (VSCode, etc.)
3. **Voir les changements** automatiquement dans le navigateur
4. **Pas de redémarrage** manuel nécessaire

Votre code est **100% synchronisé** ! 🎉