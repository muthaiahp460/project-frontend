import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['axios', 'react', 'react-dom'] // add any problematic module here
    }
  }
});
