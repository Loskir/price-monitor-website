<template>
  <div class="scanner-view">
    <div id="reader" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { useRouter } from 'vue-router'

const isLoading = ref(true)
const router = useRouter()

onMounted(async () => {
  const scanner = new Html5Qrcode('reader', {
    verbose: true,
    formatsToSupport: [
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
    ],
  })
  await scanner.start(
    { facingMode: 'environment' },
    {
    fps: 5,
    qrbox: (w, h) => {
      const width = Math.max(w, h) * 0.4
      return { width, height: width*0.6 }
    },
  },
    async (text, result) => {
      await scanner.stop()
      await router.push(`/product/ean/${text}`)
    },
    () => {},
  )
  isLoading.value = false
})
</script>

<style>
.scanner-view {
  position: relative;
}
.overlay {
  position: absolute;
  background-color: antiquewhite;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
