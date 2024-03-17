import { BarcodeDetector, BarcodeDetectorOptions } from "barcode-detector/pure";
import { useEffect, useRef } from "react";

type Decoder = (imageData: ImageBitmapSourceWebCodecs) => Promise<string | null | undefined>

const useDecoder = (opts?: BarcodeDetectorOptions) => {
  const decoder = useRef<Decoder | null>(null)
  useEffect(() => {
    const detector = new BarcodeDetector(opts || {
      formats: ['qr_code']
    })
    decoder.current = async (imageData: ImageBitmapSourceWebCodecs) => {
      try {
        const decoded = await detector.detect(imageData);
        if (decoded.length) return decoded.at(0)?.rawValue
      } catch (_) {
        return null
      }
    }
  }, [opts])
  return { decoder }
}

export default useDecoder