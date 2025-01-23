import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true
  },
  // Base URL configuration for production
  base: '/',
<<<<<<< HEAD
})
=======
})
>>>>>>> f9443361b0b9d495c20a5f74bc861ef34acb58d1
