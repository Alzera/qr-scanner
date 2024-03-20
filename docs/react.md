# QRScanner

Combined version of Scanner component and DropZone component, comes with a built-in button that allows users to switch between the scanning mode and the drop zone mode.

## Basic Example

    import React, { useState } from 'react';
    import QRScanner from '@alzera/qr-scanner/react';
    
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

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: any) => void | Callback function triggered when an error occurs during scanning. |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |
| switchLabel | (isScanner: boolean) => React.ReactNode | Function to customize the label for the switch component. |
| dropChildren | React.ReactNode | React node to customize the content of the drop area. |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |


# Scanner

Simple component wrapper for barcode-detector library.

## Basic Example

    import React, { useState } from 'react';
    import { Scanner } from '@alzera/qr-scanner/react';
    
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

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: any) => void | Callback function triggered when an error occurs during scanning. |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |

# DropZone

Simple component wrapper for barcode-detector library.

## Basic Example

    import React, { useState } from 'react';
    import { DropZone } from '@alzera/qr-scanner/react';
    
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

## Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| onScan* | (value: string) => void | Callback function triggered when a QR code is scanned. Passes the scanned data as an argument. |
| onError | (error: any) => void | Callback function triggered when an error occurs during scanning. |
| children | React.ReactNode | React node to customize the content of the drop area. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |
| style | React.CSSProperties | Apply custom styles to the scanner component. |
| className | string | Add custom class names to the scanner component. |