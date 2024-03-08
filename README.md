
# React QR Scanner

<a href="https://www.npmjs.com/package/@alzera/react-qr-scanner"><img src="https://badge.fury.io/js/@alzera%2Freact-qr-scanner.svg" alt="npm version"></a> <a href="https://bundlephobia.com/package/@alzera/react-qr-scanner"><img src="https://img.shields.io/bundlephobia/min/%40alzera%2Freact-qr-scanner" title="minified size"></a> <a href="https://bundlephobia.com/package/@alzera/react-qr-scanner"><img src="https://img.shields.io/bundlephobia/minzip/%40alzera%2Freact-qr-scanner" title="minified zip size"></a>

`@alzera/react-qr-scanner` is a lightweight and simple-to-use React library for integrating QR code scanning functionality into your web applications. The primary goal of this library is to provide a hassle-free solution for developers who need a quick and efficient way to incorporate QR code scanning without the bloat.

## Features

-   **Lightweight:** Keep your web application nimble with a minimalistic QR code scanning solution.
-   **Simplicity:** Easy-to-use API designed for developers of all skill levels.
-   **Legacy:** Support image input as camera fallback.
-   **Customizable:** Tailor the scanner's appearance to suit your application's needs.

## Installation

Install `@alzera/react-qr-scanner` using your preferred package manager:

    npm install @alzera/react-qr-scanner

## Components

### QRScanner

Combined version of Scanner component and DropZone component, comes with a built-in button that allows users to switch between the scanning mode and the drop zone mode.

#### Basic Example

    import React, { useState } from 'react';
    import QRScanner from '@alzera/react-qr-scanner';
    
    const MyQRScannerComponent = () => {
      const [scannedData, setScannedData] = useState('');
    
      return (
        <div style={{ maxWidth: '500px' }}>
          <QRScanner onScan={(d) => d && setScannedData(d)} />
          {scannedData && <p>Scanned Data: {scannedData}</p>}
        </div>
      );
    };
    
    export default MyQRScannerComponent;

#### Props

| Prop    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: Error) => void | Callback function triggered when an error occurs during scanning. |
| facingMode | 'environment' / 'user' | Specify the camera facing mode. |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| switchLabel | (isScanner: boolean) => React.ReactNode | Function to customize the label for the switch component. |
| dropChildren | React.ReactNode | React node to customize the content of the drop area. |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |


### Scanner

Simple component wrapper for barcode-detector library.

#### Basic Example

    import React, { useState } from 'react';
    import { Scanner } from '@alzera/react-qr-scanner';
    
    const MyScannerComponent = () => {
      const [scannedData, setScannedData] = useState('');
    
      return (
        <div style={{ maxWidth: '500px' }}>
          <Scanner onScan={(d) => d && setScannedData(d)} />
          {scannedData && <p>Scanned Data: {scannedData}</p>}
        </div>
      );
    };
    
    export default MyScannerComponent;

#### Props

| Prop    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: Error) => void | Callback function triggered when an error occurs during scanning. |
| facingMode | 'environment' / 'user' | Specify the camera facing mode. |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |

### DropZone

Simple component wrapper for barcode-detector library.

#### Basic Example

    import React, { useState } from 'react';
    import { DropZone } from '@alzera/react-qr-scanner';
    
    const MyDropZoneComponent = () => {
      const [scannedData, setScannedData] = useState('');
    
      return (
        <div style={{ maxWidth: '500px' }}>
          <DropZone onScan={(d) => d && setScannedData(d)} />
          {scannedData && <p>Scanned Data: {scannedData}</p>}
        </div>
      );
    };
    
    export default MyDropZoneComponent;

#### Props

| Prop    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: Error) => void | Callback function triggered when an error occurs during scanning. |
| children | React.ReactNode | React node to customize the content of the drop area. |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |

## Contributing

We welcome contributions! Feel free to open issues, create pull requests, or provide feedback.

Happy scanning! 📷 🚀