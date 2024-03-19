<script setup>
  import { QrScanner } from '@alzera/qr-scanner/vue'
  import '@alzera/qr-scanner/vue/qr-scanner.css'

  const scan = ref('')
</script>

<template>
  <div>
    <QrScanner v-model="scan" />
    {{ scan }}
  </div>
</template>
