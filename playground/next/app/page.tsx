'use client'

import QrScanner from '@alzera/qr-scanner/react'

export default function Home() {
  return (
    <main>
      <QrScanner onScan={console.log} onError={console.log} />
    </main>
  );
}