'use client'

import styles from "./page.module.css";

import QrScanner from '@alzera/qr-scanner/react'

export default function Home() {
  return (
    <main className={styles.main} style={{ maxWidth: '500px' }}>
      <QrScanner onScan={console.log} onError={console.log} />
    </main>
  );
}