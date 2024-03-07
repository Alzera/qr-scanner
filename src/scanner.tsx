import { useEffect, useRef } from "react"

import decoder from "./utils/decoder"
import type ScannerProps from "./types/scanner-props"

interface HTMLVideoElementExtended extends HTMLVideoElement {
  mozSrcObject?: MediaStream
}

export default function Scanner({
  onScan,
  onError,
  facingMode = 'environment',
  flipHorizontally = false,
  delay = 800,
  aspectRatio = '1/1',
}: ScannerProps) {
  const preview = useRef<HTMLVideoElementExtended>(null)
  let timeout: NodeJS.Timeout | null,
    stopCamera: (() => void) | undefined

  const handleVideo = (stream: MediaStream) => {
    if (!preview.current) {
      timeout = setTimeout(() => handleVideo(stream), 200)
      return
    }

    if (preview.current.srcObject !== undefined) {
      preview.current.srcObject = stream
    } else if (preview.current.mozSrcObject !== undefined) {
      preview.current.mozSrcObject = stream
    } else if (window.URL.createObjectURL) {
      preview.current.src = window.URL.createObjectURL(stream as any)
    } else if (window.webkitURL) {
      preview.current.src = window.webkitURL.createObjectURL(stream as any)
    } else {
      preview.current.src = stream as any
    }

    const streamTrack = stream.getTracks()[0]
    stopCamera = streamTrack.stop.bind(streamTrack)
    preview.current.addEventListener('canplay', handleCanPlay)
  }

  const handleCanPlay = () => {
    if (!preview.current) return

    preview.current.play()
      .then(() => timeout = setTimeout(check, delay))
      .catch(onError)
    preview.current.removeEventListener('canplay', handleCanPlay)
  }

  const check = () => {
    if (!preview.current) {
      timeout = setTimeout(check, delay)
      return
    }

    if (preview.current.readyState === preview.current.HAVE_ENOUGH_DATA) {
      const decode = () => {
        if (!preview.current) return

        decoder(preview.current).then((code) => {
          timeout = setTimeout(decode, delay)
          if (code) onScan(code)
        })
      }
      decode()
    } else {
      timeout = setTimeout(check, delay)
    }
  }

  useEffect(() => {
    getDeviceId(facingMode).then((deviceId) => navigator.mediaDevices.getUserMedia({
      video: {
        deviceId
      }
    })).then(handleVideo).catch(onError)
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
      if (stopCamera) {
        stopCamera()
      }
    }
  })

  return <video
    id="qr-scanner"
    ref={preview}
    preload="none"
    playsInline
    style={{
      aspectRatio: aspectRatio,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: flipHorizontally ? 'scaleX(1)' : 'scaleX(-1)',
    }} />
}

const getDeviceId = (facingMode: string) => new Promise<string>((resolve, reject) => {
  try {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      if (videoDevices.length < 1) {
        reject(new Error('No video input devices found'))
        return
      }
      const pattern = facingMode === 'environment' ? /rear|back|environment/gi : /front|user|face/gi
      const filteredDevices = videoDevices.filter(({ label }) => pattern.test(label))

      if (filteredDevices.length > 0) return resolve(filteredDevices[0].deviceId)
      if (videoDevices.length === 1 || facingMode === 'user') return resolve(videoDevices[0].deviceId)
      resolve(videoDevices[1].deviceId)
    })
  } catch (err) {
    reject(new Error('No video input devices found'))
  }
})