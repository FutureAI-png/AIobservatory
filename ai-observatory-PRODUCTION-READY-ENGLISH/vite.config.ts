import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      '5173-i1ktze3qqui96sblrg9xb-646c8950.manusvm.computer',
      'localhost',
      '.manusvm.computer'
    ]
  },
  assetsInclude: ['**/*.md']
})
