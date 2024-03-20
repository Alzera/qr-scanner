<script setup>
import { QrScanner } from '@alzera/qr-scanner/vue'
import '@alzera/qr-scanner/vue/qr-scanner.css'

const scan = ref('')
</script>

<template>
  <div>
    <QrScanner @scan="(v) => scan = v" />
    <p v-if="scan">Scanned Data: {{ scan }}</p>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
}
</style>