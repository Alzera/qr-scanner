import { useRef } from "react";

import { decoder, fileToImageData } from "./utilities";
import type { ScannerProps } from "./utilities";

export default function DropArea({
  onScan,
  onError,
}: Pick<ScannerProps, 'onScan' | 'onError'>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDetect = async (file: File) => {
    try {
      const detectedCodes = await fileToImageData(file);
      if (!detectedCodes) return
      const data = await decoder(detectedCodes)
      if (!data) return
      onScan(data)
    } catch (error) {
      onError && onError(error)
    }
  }

  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!e.dataTransfer.files.length) return;
        handleDetect(e.dataTransfer.files[0])
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '2px dashed',
        padding: '16px',
        boxSizing: 'border-box',
        textAlign: 'center',
        lineHeight: '2rem',
        minHeight: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={({ target }) => target.files?.length && handleDetect(target.files[0])}
        style={{
          position: 'absolute',
          inset: '0',
          opacity: '0',
        }}
      />
      <div>Drop an image here to scan<br />or<br /><u>Click here to browse</u></div>
    </div>
  );
};