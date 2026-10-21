import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/wps/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: ['index.html', 'map/index.html'],
    },
  },
})
