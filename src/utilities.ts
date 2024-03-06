import jsQR from 'jsqr';

export interface ScannerProps {
  onError?: (error: any) => void;
  onScan: (value: string) => void;
  facingMode?: string;
  flipHorizontally?: boolean;
  delay?: number;
  resolution?: number;
  aspectRatio?: string;
}

export const decoder = (imageData: ImageData) =>
  new Promise<string | undefined>((resolve) => {
    const decoded = jsQR(imageData.data, imageData.width, imageData.height);
    if (decoded) resolve(decoded.data);
    else resolve(undefined);
  });

function defaultDeviceIdChooser(
  filteredDevices: MediaDeviceInfo[],
  videoDevices: MediaDeviceInfo[],
  facingMode: string
) {
  if (filteredDevices.length > 0) return filteredDevices[0].deviceId;
  if (videoDevices.length === 1 || facingMode === 'user') return videoDevices[0].deviceId;
  return videoDevices[1].deviceId;
}

export const getDeviceId = (
  facingMode: string,
  chooseDeviceId: (
    filteredDevices: MediaDeviceInfo[],
    videoDevices: MediaDeviceInfo[],
    facingMode: string
  ) => string = defaultDeviceIdChooser
) => new Promise<string>((resolve, reject) => {
  try {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      if (videoDevices.length < 1) {
        reject(new Error('No video input devices found'));
        return;
      }
      const pattern = facingMode === 'environment' ? /rear|back|environment/gi : /front|user|face/gi;;
      const filteredDevices = videoDevices.filter(({ label }) => pattern.test(label));
      resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode));
    });
  } catch (err) {
    reject(new Error('No video input devices found'));
  }
})

export const fileToImageData = async (file: File): Promise<ImageData | null> => {
  if (!file || !file.type.startsWith('image/')) return null

  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;

  try {
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  } catch (error) {
    URL.revokeObjectURL(url);
    return null;
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    URL.revokeObjectURL(url);
    return null;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(url);

  return imageData;
}