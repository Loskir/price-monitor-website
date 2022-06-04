<template>
  <div class="scanner-view">
    <div id="reader" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import { useRouter } from 'vue-router'

const isLoading = ref(true)
const router = useRouter()

onMounted(async () => {
  const config = { fps: 10, qrbox: { width: 450, height: 250 } }
  const scanner = new Html5Qrcode('reader')
  await scanner.start(
    { facingMode: 'environment' },
    config,
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
