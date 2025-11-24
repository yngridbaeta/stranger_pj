import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// Plugin para copiar service worker e fallback sem processar
const copyStaticFiles = () => {
  return {
    name: 'copy-static-files',
    closeBundle() {
      // Copiar service worker
      copyFileSync(
        resolve(__dirname, 'public/service-worker.js'),
        resolve(__dirname, 'dist/service-worker.js')
      )
      // Copiar fallback offline
      copyFileSync(
        resolve(__dirname, 'public/fallback-offline.html'),
        resolve(__dirname, 'dist/fallback-offline.html')
      )
      console.log('✅ Service Worker e Fallback copiados para dist/')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyStaticFiles()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      }
    }
  }
})
