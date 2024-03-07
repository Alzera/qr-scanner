
# React QR Scanner
<a href="https://bundlephobia.com/package/@alzera/react-qr-scanner">
	<img src="https://badgen.net/bundlephobia/minzip/@alzera/react-qr-scanner" alt="size minified + gzipped">
</a>
`@alzera/react-qr-scanner` is a lightweight and simple-to-use React library for integrating QR code scanning functionality into your web applications. The primary goal of this library is to provide a hassle-free solution for developers who need a quick and efficient way to incorporate QR code scanning without the bloat.

## Features

-   **Lightweight:** Keep your web application nimble with a minimalistic QR code scanning solution.
-   **Simplicity:** Easy-to-use API designed for developers of all skill levels.
-   **Legacy:** Support image input as camera fallback.
-   **Customizable:** Tailor the scanner's appearance to suit your application's needs.

## Installation

Install `@alzera/react-qr-scanner` using your preferred package manager:

    npm install @alzera/react-qr-scanner

## Usage

### Basic Example

    import React, { useState } from 'react';
    import QRScanner from '@alzera/react-qr-scanner';
    
    const MyQRScannerComponent = () => {
      const [scannedData, setScannedData] = useState(null);
    
      const handleScan = (data) => {
        if (data) {
          setScannedData(data);
        }
      };
    
      return (
        <div>
          <QRScanner onScan={handleScan} />
          {scannedData && <p>Scanned Data: {scannedData}</p>}
        </div>
      );
    };
    
    export default MyQRScannerComponent;

### Props

-   **`onScan`** _(required)_: Callback function triggered when a QR code is scanned. Passes the scanned data as an argument.
-   **`onError`**: Callback function triggered when an error occurs during scanning.
-   **`facingMode`**: Specify the camera facing mode (`user` or `environment`).
-   **`flipHorizontally`**: Flip the video feed horizontally.
-   **`delay`**: Set the delay (in milliseconds) between scans.
-   **`resolution`**: Set the resolution of the scanner.
-   **`aspectRatio`**: Set the aspect ratio of the scanner window.
-   **`switchLabel`**: Function to customize the label for the switch component (if applicable).
-   **`dropChildren`**: React node to customize the content of the drop area (if applicable).
-   **`style`**: Apply custom styles to the scanner component.
-   **`className`**: Add custom class names to the scanner component.

## Contributing

We welcome contributions! Feel free to open issues, create pull requests, or provide feedback.

Happy scanning! 📷🚀