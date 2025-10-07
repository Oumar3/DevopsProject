# 🐳 Configuration Docker Compose Production

## ✅ Fonctionnalités implémentées

### 🔧 **Extensions YAML réutilisables :**
- `x-resources-light` : Ressources pour services légers (frontend, nginx)
- `x-resources-medium` : Ressources pour services moyens (backend)
- `x-resources-heavy` : Ressources pour services lourds (database)
- `x-logging` : Configuration logs standard
- `x-logging-verbose` : Configuration logs détaillés
- `x-common-config` : Configuration commune (restart, networks)

### 📊 **Allocation des ressources :**

| Service | CPU Limit | Memory Limit | CPU Reserved | Memory Reserved |
|---------|-----------|--------------|--------------|-----------------|
| Frontend | 0.5 | 512MB | 0.25 | 256MB |
| Backend | 1.0 | 1GB | 0.5 | 512MB |
| MongoDB | 2.0 | 2GB | 1.0 | 1GB |
| Nginx | 0.5 | 512MB | 0.25 | 256MB |

### 📝 **Gestion des logs :**
- **Standard** : max 10MB/fichier, 3 fichiers de rotation
- **Verbose** : max 50MB/fichier, 5 fichiers de rotation
- **Labels** : service, environment, version pour le filtrage

### 🔐 **Sécurité :**
- Secrets Docker pour les mots de passe MongoDB
- Variables d'environnement sécurisées
- Réseau isolé avec subnet personnalisé

### 💾 **Volumes persistants :**
- `mongo-data` : Données MongoDB (bind mount)
- `mongo-config` : Configuration MongoDB
- `mongo-logs` : Logs MongoDB
- `backend-logs` : Logs du backend
- `backend-uploads` : Fichiers uploadés
- `nginx-logs` : Logs Nginx

### 🌐 **Réseau :**
- Réseau bridge personnalisé : `devops-bridge`
- Subnet isolé : `172.20.0.0/16`
- Communication inter-services sécurisée

## 🚀 **Commandes de lancement :**

```bash
# Démarrage en production
docker-compose -f docker-compose-prod.yml up -d

# Monitoring des logs
docker-compose -f docker-compose-prod.yml logs -f

# Arrêt propre
docker-compose -f docker-compose-prod.yml down

# Reconstruction complète
docker-compose -f docker-compose-prod.yml down -v
docker-compose -f docker-compose-prod.yml build --no-cache
docker-compose -f docker-compose-prod.yml up -d
```

## 📈 **Monitoring et Healthchecks :**
- Frontend : Vérification HTTP sur `/health`
- Backend : Test API sur `/api/articles`
- MongoDB : Commande `mongosh ping`
- Nginx : Intégré avec Traefik

## 🎯 **Configuration optimisée pour :**
- ✅ Haute disponibilité
- ✅ Performance en production
- ✅ Monitoring et logging
- ✅ Sécurité renforcée
- ✅ Scalabilité horizontale
- ✅ Gestion des ressources