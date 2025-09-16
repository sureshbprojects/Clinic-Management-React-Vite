import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // You might see a 'build' section here
    build: {
    // This is the setting that controls the output directory
    outDir: 'dist', 
  },
})
