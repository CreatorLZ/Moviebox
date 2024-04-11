import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port:  3000, 
  },
  define: {
    // Make environment variables accessible in components
    'process.env': JSON.stringify(process.env),
  },
});
