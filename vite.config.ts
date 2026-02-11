import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      // Définit le port sur 3000
    strictPort: true, // Si le port 3000 est occupé, Vite s'arrêtera au lieu d'en chercher un autre
    host: true       // Utile si vous voulez exposer l'app sur votre réseau local (ex: 192.168.x.x)
  }
})
