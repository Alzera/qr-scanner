<script setup lang="ts">
import { ref } from 'vue'

import type ScannerProps from "../types/scanner-props";
import { Scanner, DropZone } from '.';

const model = defineModel<string>({ required: true })
const emit = defineEmits<{
  error: [error: any];
}>();
const {
  flipHorizontally,
  delay,
  aspectRatio,
  decoderOptions,
} = defineProps<Omit<ScannerProps, 'onScan' | 'onError'>>()

const isScanner = ref(true)

const onError = (err: any) => emit('error', err)
</script>

<template>
  <div id="qr-scanner-layout">
    <Scanner v-if="isScanner" v-model="model" @error="onError" :flipHorizontally="flipHorizontally" :delay="delay"
      :aspectRatio="aspectRatio" :decoderOptions="decoderOptions" />
    <DropZone v-else v-model="model" @error="onError" :decoderOptions="decoderOptions">
      <slot name="drop-children"></slot>
    </DropZone>
    <button type="button" @click="() => isScanner = !isScanner">
      <slot name="switch-label">
        Switch to {{ isScanner ? 'image input' : 'scanner' }}
      </slot>
    </button>
  </div>
</template>

<style scoped>
#qr-scanner-layout {
  width: 100%;
}

#qr-scanner-layout>button {
  width: 100%;
  margin-top: 16px;
  font-size: 1rem;
}
</style>