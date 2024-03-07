'use client'

import styles from "./page.module.css";

import QrScanner from '@alzera/react-qr-scanner'

export default function Home() {
  return (
    <main className={styles.main}>
      <QrScanner 
        onScan={(t) => console.log(t)} 
        switchLabel={(isScanner) => 'Lalala'}
        />
    </main>
  );
}
