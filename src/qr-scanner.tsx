import { useState } from "react";

import Scanner from "./scanner";
import DropArea from "./drop-area"
import type ScannerProps from "./types/scanner-props";

export default function QrScanner({
  onScan,
  onError,
  facingMode,
  flipHorizontally,
  delay,
  resolution,
  aspectRatio,
  style,
  className,
}: ScannerProps & {
  style?: React.CSSProperties;
  className?: string;
}) {
  const [isScanner, setIsScanner] = useState(true)
  return (
    <div className={className} style={{
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
        : <DropArea
          onScan={onScan}
          onError={onError} />}
      <button
        type="button"
        onClick={() => setIsScanner(!isScanner)}
        style={{
          width: '100%',
          marginTop: '16px',
          fontSize: '1rem',
        }}>
        Switch to {isScanner ? 'image input' : 'scanner'}
      </button>
    </div>
  );
}