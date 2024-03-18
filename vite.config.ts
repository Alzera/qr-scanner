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
    lib: {
      entry: {
        'react/index': resolve(__dirname, 'src/react/index.tsx'),
        'react/scanner': resolve(__dirname, 'src/react/scanner.tsx'),
        'react/drop-zone': resolve(__dirname, 'src/react/drop-zone.tsx'),
      },
      formats: ['es', 'cjs'],
      name: 'QrScanner',
      fileName: (format, entryName) => format === 'es' ? `${entryName}.js` : `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['react','react/jsx-runtime', 'barcode-detector/pure'],
      output: {
        exports: "named"
      }
    }
  },
});