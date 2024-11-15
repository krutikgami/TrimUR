import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/Api': {
       target: 'http://localhost:3000',
       secure: false,
     },
    },
  }
})
