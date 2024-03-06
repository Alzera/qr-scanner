import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  plugins: [react(), dts({ // Add dts plugin for type definitions
    insertTypesEntry: true,
  })],
  build: {
    lib: {
      entry: './src/index.tsx', // Specify entry point
      name: 'ReactQrScanner', // Set library name
      fileName: (format) => `react-qr-scanner.${format}.js`, // Customize output file names
    },
    // Other relevant build options...
  },
});