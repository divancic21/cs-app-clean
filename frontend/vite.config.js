import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['ikona.png'],
      manifest: {
        name: 'CS Skins App',
        short_name: 'CSApp',
        description: 'PWA za pregled CS skinova',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'ikona.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'ikona.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
