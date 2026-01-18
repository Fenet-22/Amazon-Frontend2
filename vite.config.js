import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use '/' so it works perfectly on Netlify and Localhost
  base: '/', 
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']], 
      },
    }),
  ],
});