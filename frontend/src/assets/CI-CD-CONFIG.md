# =============================================================================
# Configuration CI/CD - Secrets et Variables d'environnement
# =============================================================================

## 🔐 Secrets GitHub à configurer

### Repository Secrets (Settings > Secrets and variables > Actions)

```bash
# Authentification Docker Registry
DOCKER_USERNAME=your-docker-username
DOCKER_PASSWORD=your-docker-password

# Base de données
MONGODB_URI=mongodb://username:password@host:port/database
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your-secure-password

# Déploiement
DEPLOY_HOST=your-server-ip
DEPLOY_USER=deploy-user
DEPLOY_SSH_KEY=your-private-ssh-key

# API Keys (si nécessaire)
API_KEY_EXTERNAL=your-api-key
JWT_SECRET=your-jwt-secret

# Monitoring (optionnel)
SLACK_WEBHOOK_URL=your-slack-webhook
DISCORD_WEBHOOK_URL=your-discord-webhook
```

### Environment Variables (Repository > Settings > Environments)

#### Development Environment
- `NODE_ENV=development`
- `API_URL=http://localhost:5000/api`
- `FRONTEND_URL=http://localhost:3000`

#### Staging Environment  
- `NODE_ENV=staging`
- `API_URL=https://api-staging.your-domain.com`
- `FRONTEND_URL=https://staging.your-domain.com`

#### Production Environment
- `NODE_ENV=production`
- `API_URL=https://api.your-domain.com`
- `FRONTEND_URL=https://your-domain.com`

## 📋 Configuration des Environments

### Création des environments GitHub:
1. Repository > Settings > Environments
2. Créer: `development`, `staging`, `production`
3. Configurer les protection rules pour production:
   - Required reviewers
   - Wait timer
   - Deployment branches (main only)

## 🔧 Variables d'environnement par service

### Frontend (.env.example)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=DevOps Frontend
VITE_APP_VERSION=1.0.0
NODE_ENV=development
```

### Backend (.env.example)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/devops_project
JWT_SECRET=your-jwt-secret-here
```

## 🚀 Commandes de déploiement

### Déploiement manuel
```bash
# Déclenchement manuel du pipeline
gh workflow run ci.yml

# Déploiement en production
gh workflow run cd.yml -f version=v1.0.0

# Tests complets
gh workflow run tests.yml
```

### Tags et releases
```bash
# Créer un tag pour déclencher le déploiement
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Créer une release GitHub
gh release create v1.0.0 --title "Release v1.0.0" --notes "Description des changements"
```