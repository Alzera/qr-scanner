<script setup lang="ts">
import { computed } from 'vue'

import type ScannerProps from "../types/scanner-props";
import createDecoder from "../utils/create-decoder"

const emit = defineEmits<{
  scan: [value: string];
  error: [error: any];
}>();
const { 
  decoderOptions
} = defineProps<Pick<ScannerProps, 'decoderOptions'>>()

const decoder = computed(() => createDecoder(decoderOptions))

const handler = async (file: File) => {
  try {
    const value = await decoder.value(file)
    if (value) emit('scan', value)
  } catch (error) {
    emit('error', error)
  }
}
const dropHandler = async (e: DragEvent) => {
  if (!e.dataTransfer?.files.length) return;
  handler(e.dataTransfer.files[0])
}

const changeHandler = async (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement
  target?.files?.length && handler(target.files[0])
}
</script>

<template>
  <div id="qr-drop-zone" @drop.stop.prevent="dropHandler">
    <input type="file" accept="image/*" @change="changeHandler" />
    <slot>
      <div>Drop an image here to scan<br />or<br /><u>Click here to browse</u></div>
    </slot>
  </div>
</template>

<style scoped>
#qr-drop-zone {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px dashed;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
  line-height: 2rem;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#qr-drop-zone>input {
  position: absolute;
  inset: 0;
  opacity: 0;
}
</style>