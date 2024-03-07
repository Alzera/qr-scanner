import { useState } from "react";

import Scanner from "./scanner";
import DropZone from "./drop-zone"
import type ScannerProps from "./types/scanner-props";

export default function QrScanner({
  onScan,
  onError,
  facingMode,
  flipHorizontally,
  delay,
  resolution,
  aspectRatio,
  switchLabel,
  dropChildren,
  style,
  className,
}: ScannerProps & {
  switchLabel?: (isScanner: boolean) => React.ReactNode
  dropChildren?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  const [isScanner, setIsScanner] = useState(true)
  return (
    <div id="qr-scanner-layout" className={className} style={{
      ...style,
      width: '100%'
    }}>
      {isScanner
        ? <Scanner
          onScan={onScan}
          onError={onError}
          facingMode={facingMode}
          flipHorizontally={flipHorizontally}
          delay={delay}
          resolution={resolution}
          aspectRatio={aspectRatio}
        />
        : <DropZone
          onScan={onScan}
          onError={onError}>
          {dropChildren}
        </DropZone>}
      <button
        type="button"
        onClick={() => setIsScanner(!isScanner)}
        style={{
          width: '100%',
          marginTop: '16px',
          fontSize: '1rem',
        }}>
        {switchLabel !== undefined
          ? switchLabel(isScanner)
          : `Switch to ${isScanner ? 'image input' : 'scanner'}`}
      </button>
    </div>
  );
}