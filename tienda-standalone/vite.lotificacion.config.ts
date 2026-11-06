import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: '../demo-lotificacion',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/lotificacion-entry.tsx'),
      name: 'LotificacionApp',
      fileName: () => 'lotificacion.bundle.js',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  }
});
