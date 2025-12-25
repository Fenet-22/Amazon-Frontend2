import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Amazon-Clone-Frontend/', 
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']], 
      },
    }),
  ],
});
