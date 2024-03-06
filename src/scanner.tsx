import { useEffect, useRef } from "react";

import { getDeviceId, decoder } from "./utilities";
import type { ScannerProps } from "./utilities";

interface HTMLVideoElementExtended extends HTMLVideoElement {
  mozSrcObject?: MediaStream
}

export default function Scanner({
  onScan,
  onError,
  facingMode = 'environment',
  flipHorizontally = false,
  delay = 800,
  resolution = 1080,
  aspectRatio = '1/1',
}: ScannerProps) {
  const preview = useRef<HTMLVideoElementExtended>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  let timeout: number | null, stopCamera: (() => void) | undefined;

  const handleVideo = (stream: MediaStream) => {
    if (!preview.current) {
      timeout = setTimeout(() => handleVideo(stream), 200);
      return
    }

    if (preview.current.srcObject !== undefined) {
      preview.current.srcObject = stream;
    } else if (preview.current.mozSrcObject !== undefined) {
      preview.current.mozSrcObject = stream;
    } else if (window.URL.createObjectURL) {
      preview.current.src = window.URL.createObjectURL(stream as any);
    } else if (window.webkitURL) {
      preview.current.src = window.webkitURL.createObjectURL(stream as any);
    } else {
      preview.current.src = stream as any
    }

    preview.current.playsInline = true;

    const streamTrack = stream.getTracks()[0];
    stopCamera = streamTrack.stop.bind(streamTrack);
    preview.current.addEventListener('loadstart', handleLoadStart);
  };

  const handleLoadStart = () => {
    preview.current?.play()
      .then(() => timeout = setTimeout(check, delay))
      .catch(onError)

    preview.current?.removeEventListener('loadstart', handleLoadStart);
  };

  const check = () => {
    if (!preview.current || !canvas.current) {
      timeout = setTimeout(check, delay);
      return
    }

    let width = Math.floor(preview.current.videoWidth),
      height = Math.floor(preview.current.videoHeight)

    const ratio = resolution / Math.min(width, height);
    height = ratio * height;
    width = ratio * width;

    const vertOffset = -((height - resolution) / 2),
      hozOffset = -((width - resolution) / 2);

    canvas.current.width = canvas.current.height = resolution;

    if (preview.current.readyState === preview.current.HAVE_ENOUGH_DATA) {
      const ctx = canvas.current.getContext('2d', { willReadFrequently: true })!;
      const decode = () => {
        if (!preview.current || !canvas.current) return
        ctx.drawImage(preview.current, hozOffset, vertOffset, width, height);
        const imageData = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height);

        decoder(imageData).then((code) => {
          timeout = setTimeout(decode, delay);
          if (code) onScan(code);
        });
      };
      decode();
    } else {
      timeout = setTimeout(check, delay);
    }
  };

  useEffect(() => {
    getDeviceId(facingMode).then((deviceId) => navigator.mediaDevices.getUserMedia({
      video: {
        deviceId
      }
    })).then(handleVideo).catch(onError);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (stopCamera) {
        stopCamera();
      }
    };
  });

  return (
    <div style={{
      aspectRatio: aspectRatio,
      width: '100%',
      overflow: 'hidden',
    }}>
      <video style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: flipHorizontally ? 'scaleX(1)' : 'scaleX(-1)',
      }} ref={preview} />
      <canvas style={{
        display: 'none',
      }} ref={canvas} />
    </div>
  );
};