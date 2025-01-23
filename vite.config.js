import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: `${process.env.VITE_APP_BASENAME}/`,
  build: {
    outDir: '../cmx-capstone',
  },
  publicDir: '../public',
  root: 'src',
  plugins: [react(), ],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      'src': ''
    }
  }
})
