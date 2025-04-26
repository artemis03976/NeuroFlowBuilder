import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@node-configs': path.resolve(__dirname, './src/configs/node'),
      '@error-configs': path.resolve(__dirname, './src/configs/error'),
      '@optimizer-configs': path.resolve(__dirname, './src/configs/optimizer'),
    }
  },
  optimizeDeps: {
    include: ['**/*.node.ts']
  }
})
