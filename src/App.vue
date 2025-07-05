<template>
  <div class="min-h-screen bg-blue-50 text-gray-800">
    <router-view />
  </div>
</template>

<script setup>
import { App } from '@capacitor/app'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const backHandler = App.addListener('backButton', () => {
    if (router.currentRoute.value.fullPath !== '/') {
      // Go back if not on home
      router.back()
    } else {
      // Exit the app if already on home page
      App.exitApp()
    }
  })

  onUnmounted(() => {
    backHandler.remove()
  })
})
// No imports needed since this is minimal
</script>

<style>
/* Optional: global styles */
</style>
