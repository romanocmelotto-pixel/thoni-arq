import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        comercial: resolve(__dirname, 'projetos-comerciais.html'),
        especialidades: resolve(__dirname, 'especialidades.html'),
        comoTrabalhamos: resolve(__dirname, 'como-trabalhamos.html'),
        solicitarProposta: resolve(__dirname, 'solicitar-proposta.html'),
      },
    },
  },
})
