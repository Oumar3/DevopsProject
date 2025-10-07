import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuration du serveur de développement
  server: {
    host: '0.0.0.0', // Permet l'accès depuis Docker
    port: 5000,      // Port corrigé pour correspondre au docker-compose
    proxy: {
      // Proxy pour les appels API vers le backend Docker
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path // Garde /api dans le path
      }
    }
  },
  
  // Configuration pour la production
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  
  // Variables d'environnement
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || '/api')
  }
})
