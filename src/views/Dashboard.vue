<template>
  <div>
    <NavBar />
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- Dashboard Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p class="text-gray-600">Welcome back! Here's your overview</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <router-link to="/uploadpaper" class="flex-grow sm:flex-grow-0">
              <button class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Upload Paper
              </button>
            </router-link>
            <!-- Other buttons... -->
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total Papers -->
          <div class="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-blue-600">Total Papers</p>
                <h3 class="text-2xl font-bold mt-1">{{ uploadStore.stats.totalUploads }}</h3>
              </div>
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Last Upload -->
          <div class="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-purple-600">Last Upload</p>
                <h3 class="text-xl font-bold mt-1">
                  {{ lastUploadDate }}
                </h3>
              </div>
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Most Used Model -->
          <div class="bg-green-50 rounded-lg p-6 border border-green-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-green-600">Favorite Model</p>
                <h3 class="text-xl font-bold mt-1">
                  {{ mostUsedModel }}
                </h3>
              </div>
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Image Uploads -->
          <div class="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-orange-600">Image Uploads</p>
                <h3 class="text-xl font-bold mt-1">
                  {{ imageUploadsCount }} ({{ imageUploadsPercentage }}%)
                </h3>
              </div>
              <div class="bg-orange-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { useUploadStore } from '@/stores/uploads'

export default {
  computed: {
    uploadStore() {
      return useUploadStore()
    },
    lastUploadDate() {
      if (!this.uploadStore.uploads.length) return 'None'
      return this.formatDate(this.uploadStore.uploads[0].timestamp)
    },
    mostUsedModel() {
      if (!this.uploadStore.uploads.length) return 'N/A'
      
      const modelCounts = {}
      this.uploadStore.uploads.forEach(upload => {
        modelCounts[upload.model] = (modelCounts[upload.model] || 0) + 1
      })
      
      return Object.entries(modelCounts)
        .sort((a, b) => b[1] - a[1])[0][0]
    },
    imageUploadsCount() {
      return this.uploadStore.uploads
        .filter(u => u.fileType.includes('image')).length
    },
    imageUploadsPercentage() {
      if (!this.uploadStore.uploads.length) return 0
      return Math.round((this.imageUploadsCount / this.uploadStore.uploads.length) * 100)
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  }
}
</script>