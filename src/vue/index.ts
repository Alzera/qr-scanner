import type { App, Plugin } from 'vue'

import QrScanner from "./QrScanner.vue";
import Scanner from "./Scanner.vue";
import DropZone from "./DropZone.vue";

export { QrScanner, Scanner, DropZone }
export { setZXingModuleOverrides, type BarcodeDetectorOptions } from 'barcode-detector/pure'


export function install(app: App) {
  app.component('qr-scanner', QrScanner)
  app.component('scanner', Scanner)
  app.component('drop-zone', DropZone)
}
const plugin: Plugin = { install }
export { plugin as QrScannerPlugin }