import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo atual
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Isso expõe a variável API_KEY para o código do cliente
      // O 'process.env.API_KEY' será substituído pelo valor real durante o build
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
    },
  };
});