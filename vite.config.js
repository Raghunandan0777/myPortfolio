import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React portfolio with optimized settings
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
