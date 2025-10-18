import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuration du serveur de développement
  server: {
    host: '0.0.0.0',
    port: 3000
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
