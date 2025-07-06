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
  const backHandler = App.addListener('backButton', async () => {
    if (router.currentRoute.value.fullPath !== '/') {
      // Go back if not on home
      router.back()
    } else {
      // Ask the user before exiting the app
      const confirmed = window.confirm('Are you sure you want to exit the app?')
      if (confirmed) {
        App.exitApp()
      }
    }
  })

  onUnmounted(() => {
    backHandler.remove()
  })
})
</script>
