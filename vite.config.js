import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'axios',  // Example: Externalize axios if you want to exclude it
      ]
    }
  }
});
