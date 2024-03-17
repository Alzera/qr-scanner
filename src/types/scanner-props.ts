export default interface ScannerProps {
  onError?: (error: Error) => void;
  onScan: (value: string) => void;
  flipHorizontally?: boolean;
  delay?: number;
  aspectRatio?: string;
}