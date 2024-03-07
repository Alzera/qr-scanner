import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ],
  build: {
    // sourcemap: true,
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/index.ts'),
        'qr-scanner': resolve(__dirname, 'src/qr-scanner.tsx'),
        'scanner': resolve(__dirname, 'src/scanner.tsx'),
        'drop-zone': resolve(__dirname, 'src/drop-zone.tsx'),
      },
      formats: ['es'],
      name: 'ReactQrScanner',
      // fileName: (format, entryName) => format === 'es' ? `${entryName}.js` : `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['react','react/jsx-runtime'],
      output: {
        exports: "named"
      }
    }
  },
});