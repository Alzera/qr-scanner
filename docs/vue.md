# QRScanner

Combined version of Scanner component and DropZone component, comes with a built-in button that allows users to switch between the scanning mode and the drop zone mode.

## Basic Example

    <script setup>
    import { QrScanner } from '@alzera/qr-scanner/vue'
    import '@alzera/qr-scanner/vue/qr-scanner.css'
    
    const scan = ref('')
    </script>
    
    <template>
      <div>
        <QrScanner @scan="(v) => scan = v" />
        <p v-if="scan">Scanned Data: {{ scan }}</p>
      </div>
    </template>
    
    <style scoped>
    div {
      max-width: 500px;
    }
    </style>

## Slots

| Name    | Description |
| -------- | ------- |
| drop-children | Content of drop zone, inside the border. |

## Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |


# Scanner

Simple component wrapper for barcode-detector library.

## Basic Example

    <script setup>
    import { Scanner } from '@alzera/qr-scanner/vue'
    import '@alzera/qr-scanner/vue/qr-scanner.css'
    
    const scan = ref('')
    </script>
    
    <template>
      <div>
        <Scanner @scan="(v) => scan = v" />
        <p v-if="scan">Scanned Data: {{ scan }}</p>
      </div>
    </template>
    
    <style scoped>
    div {
      max-width: 500px;
    }
    </style>

## Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |

# DropZone

Simple component wrapper for barcode-detector library.

## Basic Example

    <script setup>
    import { DropZone } from '@alzera/qr-scanner/vue'
    import '@alzera/qr-scanner/vue/qr-scanner.css'
    
    const scan = ref('')
    </script>
    
    <template>
      <div>
        <DropZone @scan="(v) => scan = v" />
        <p v-if="scan">Scanned Data: {{ scan }}</p>
      </div>
    </template>
    
    <style scoped>
    div {
      max-width: 500px;
    }
    </style>

## Slots

Content of drop zone, inside the border

## Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |