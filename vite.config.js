// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    port: 3000,  // or whichever port you prefer
    host: '0.0.0.0'  // This allows external access
  },
  build: {
    rollupOptions: {
      external: [
        'axios',  // Example: Externalize axios if you want to exclude it
      ]
    }
  }
};
