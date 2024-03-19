import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({ include: resolve(__dirname, 'src/react/**/*.tsx') }),
    vue({ include: resolve(__dirname, 'src/vue/**/*.vue') }),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      staticImport: true,
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: {
        'react/scanner': resolve(__dirname, 'src/react/scanner.tsx'),
        'react/drop-zone': resolve(__dirname, 'src/react/drop-zone.tsx'),
        'react/qr-scanner': resolve(__dirname, 'src/react/qr-scanner.tsx'),
        'react/index': resolve(__dirname, 'src/react/index.ts'),

        'vue/Scanner': resolve(__dirname, 'src/vue/Scanner.vue'),
        'vue/DropZone': resolve(__dirname, 'src/vue/DropZone.vue'),
        'vue/QrScanner': resolve(__dirname, 'src/vue/QrScanner.vue'),
        'vue/index': resolve(__dirname, 'src/vue/index.ts'),
      },
      name: 'QrScanner',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'barcode-detector/pure',
        'vue',
      ],
      output: {
        exports: "named"
      }
    }
  },
});