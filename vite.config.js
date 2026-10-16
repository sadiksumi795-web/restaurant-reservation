
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'TableTime Restaurant Reservation',
        short_name: 'TableTime',
        description: 'Book your favourite restaurant table',

        theme_color: '#246b57',
        background_color: '#faf8f4',

        display: 'standalone',
        start_url: '/',
        scope: '/',

      icons: [
  {
    src: '/pwa-192x192.svg',
    sizes: 'any',
    type: 'image/svg+xml',
    purpose: 'any'
  },
  {
    src: '/pwa-512x512.svg',
    sizes: 'any',
    type: 'image/svg+xml',
    purpose: 'any'
  }
]
      },

      workbox: {
        navigateFallback: 'index.html'
      }
    })
  ],

  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true
  }
})
