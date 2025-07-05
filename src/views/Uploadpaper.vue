<template>
  <NavBar/>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-blue-800 mb-2">Upload or Scan Your Exam Paper</h2>
        <p class="text-lg text-gray-600">
          Upload PDFs/images or use your camera to scan papers for instant AI solutions
        </p>
      </div>

      <!-- Upload/Scan Card -->
      <div class="bg-white rounded-xl shadow-lg border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300">
        <div class="p-8 md:p-12">
          <!-- Tab Navigation -->
          <div class="flex border-b border-gray-200 mb-6">
            <button 
              @click="switchTab('upload')"
              :class="{'text-blue-600 border-blue-600': activeTab === 'upload', 'text-gray-500 hover:text-gray-700': activeTab !== 'upload'}"
              class="py-2 px-4 font-medium border-b-2 -mb-px transition-colors"
            >
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Upload File
            </button>
            <button 
              @click="switchTab('camera')"
              :class="{'text-blue-600 border-blue-600': activeTab === 'camera', 'text-gray-500 hover:text-gray-700': activeTab !== 'camera'}"
              class="py-2 px-4 font-medium border-b-2 -mb-px transition-colors"
            >
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Scan with Camera
            </button>
          </div>

          <!-- Upload Tab Content -->
          <div v-if="activeTab === 'upload'">
            <div 
              @dragover.prevent="dragover"
              @dragleave.prevent="dragleave"
              @drop.prevent="drop"
              :class="{'bg-blue-50 border-blue-400': isDragging, 'border-green-400 bg-green-50': uploadSuccess}"
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 relative"
              @click="openFilePicker"
            >
              <input 
                type="file" 
                ref="fileInput"
                @change="handleFileSelect"
                class="hidden" 
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
              >
              
              <div class="relative w-16 h-16 mx-auto mb-4">
                <svg 
                  v-if="!isUploading && !uploadSuccess"
                  class="w-full h-full text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                
                <div v-if="isUploading" class="w-full h-full flex items-center justify-center">
                  <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                
                <div v-if="uploadSuccess" class="w-full h-full text-green-500">
                  <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <h3 class="text-xl font-semibold text-gray-700 mb-2">
                {{ uploadedFile ? uploadedFile.name : 'Drag & Drop Files Here' }}
              </h3>
              
              <p class="text-gray-500 mb-4" v-if="!uploadedFile">
                or click to browse files (Max 10MB)
              </p>
              
              <div v-if="uploadedFile" class="text-sm text-gray-500 mb-2">
                <span class="font-medium">Size:</span> {{ formatFileSize(uploadedFile.size) }}
                <span class="mx-2">•</span>
                <span class="font-medium">Type:</span> {{ uploadedFile.type || getFileExtension(uploadedFile.name) }}
              </div>
              
              <div class="flex justify-center space-x-3 mt-4">
                <button 
                  v-if="uploadedFile && !isUploading"
                  @click.stop="removeFile"
                  class="text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-center px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Remove
                </button>
                
                <button 
                  v-if="uploadSuccess"
                  @click.stop="viewSolutions"
                  class="text-green-600 hover:text-green-800 text-sm font-medium flex items-center justify-center px-3 py-1 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  View Solutions
                </button>
              </div>
            </div>
          </div>

          <!-- Camera Tab Content -->
          <div v-if="activeTab === 'camera'" class="space-y-4">
            <!-- Camera Preview -->
            <div class="relative bg-black rounded-lg overflow-hidden" :style="{ height: '400px' }">
              <video 
                ref="cameraPreview"
                v-show="!capturedImage"
                class="w-full h-full object-cover"
                autoplay
                playsinline
              ></video>
              
              <canvas 
                ref="photoCanvas"
                class="absolute top-0 left-0 w-full h-full"
                v-show="capturedImage"
              ></canvas>
              
              <div 
                v-if="capturedImage"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div class="text-center p-4 bg-white rounded-lg max-w-xs">
                  <p class="mb-3">Is this scan clear?</p>
                  <div class="flex justify-center space-x-3">
                    <button 
                      @click.stop="retakePhoto"
                      class="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Retake
                    </button>
                    <button 
                      @click.stop="acceptPhoto"
                      class="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Use This
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Camera Controls -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button 
                  v-if="!capturedImage"
                  @click.stop="takePhoto"
                  class="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center"
                >
                  <div class="w-10 h-10 rounded-full bg-red-500 border-2 border-white"></div>
                </button>
                
                <button 
                  @click.stop="toggleCamera"
                  class="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Camera Status -->
              <div v-if="cameraError" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4">
                <div class="text-center">
                  <svg class="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <p class="text-lg font-medium mb-2">Camera Error</p>
                  <p class="mb-4">{{ cameraError }}</p>
                  <button 
                    @click.stop="initCamera"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Camera Instructions -->
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-blue-700">
                    <span class="font-medium">Tips:</span> Place paper on a flat surface with good lighting. Hold your device parallel to the paper for best results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Options and Submit Button (same as before) -->
          <!-- ... -->

        </div>
      </div>

      <!-- Features Grid and Progress Modal (same as before) -->
      <!-- ... -->
    </div>
  </section>
  <Footer/>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    // Refs for file handling
    const fileInput = ref(null)
    const uploadedFile = ref(null)
    const isDragging = ref(false)
    const uploadSuccess = ref(false)
    const isUploading = ref(false)

    // Refs for camera handling
    const activeTab = ref('upload')
    const cameraPreview = ref(null)
    const photoCanvas = ref(null)
    const capturedImage = ref(null)
    const cameraStream = ref(null)
    const cameraError = ref(null)
    const facingMode = ref('environment') // 'user' for front camera, 'environment' for back
    const showProgressModal = ref(false)

    // Initialize camera when component mounts
    onMounted(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Check camera permissions
        navigator.permissions.query({ name: 'camera' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            initCamera()
          }
        })
      }
    })

    // Clean up camera stream when component unmounts
    onBeforeUnmount(() => {
      stopCamera()
    })

    // Camera methods
    const initCamera = async () => {
      cameraError.value = null
      try {
        stopCamera() // Stop any existing stream
        
        const constraints = {
          video: {
            facingMode: facingMode.value,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        }
        
        cameraStream.value = await navigator.mediaDevices.getUserMedia(constraints)
        cameraPreview.value.srcObject = cameraStream.value
      } catch (err) {
        console.error('Camera error:', err)
        cameraError.value = 'Could not access camera. Please check permissions.'
        if (err.name === 'NotAllowedError') {
          cameraError.value = 'Camera access denied. Please allow camera permissions.'
        } else if (err.name === 'NotFoundError') {
          cameraError.value = 'No camera found on this device.'
        }
      }
    }

    const stopCamera = () => {
      if (cameraStream.value) {
        cameraStream.value.getTracks().forEach(track => track.stop())
        cameraStream.value = null
      }
      if (cameraPreview.value) {
        cameraPreview.value.srcObject = null
      }
    }

    const takePhoto = () => {
      if (!cameraStream.value) return
      
      const video = cameraPreview.value
      const canvas = photoCanvas.value
      const context = canvas.getContext('2d')
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      capturedImage.value = true
    }

    const retakePhoto = () => {
      capturedImage.value = false
    }

    const acceptPhoto = () => {
      // Convert canvas to blob
      photoCanvas.value.toBlob(blob => {
        // Create a file from the blob
        const file = new File([blob], `scan-${new Date().getTime()}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now()
        })
        
        // Set as uploaded file
        uploadedFile.value = file
        uploadSuccess.value = false
        
        // Switch back to upload tab to show the captured image
        activeTab.value = 'upload'
        
        // Stop camera
        stopCamera()
      }, 'image/jpeg', 0.9) // 90% quality
    }

    const toggleCamera = () => {
      facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
      initCamera()
    }

    const switchTab = (tab) => {
      activeTab.value = tab
      if (tab === 'camera') {
        initCamera()
      } else {
        stopCamera()
        capturedImage.value = false
      }
    }

    // File upload methods (same as before)
    const openFilePicker = () => {
      if (!isUploading.value) {
        fileInput.value.click()
      }
    }

    const handleFileSelect = (e) => {
      const files = e.target.files
      if (files.length > 0) {
        const file = files[0]
        
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size exceeds 10MB limit. Please choose a smaller file.')
          return
        }
        
        // Validate file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
        if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
          alert('Please upload a PDF, JPG, or PNG file.')
          return
        }
        
        uploadedFile.value = file
        uploadSuccess.value = false
      }
    }

    const dragover = () => {
      if (!isUploading.value) {
        isDragging.value = true
      }
    }

    const dragleave = () => {
      isDragging.value = false
    }

    const drop = (e) => {
      isDragging.value = false
      if (isUploading.value) return
      
      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        
        // Same validation as in handleFileSelect
        if (file.size > 10 * 1024 * 1024) {
          alert('File size exceeds 10MB limit. Please choose a smaller file.')
          return
        }
        
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
        if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
          alert('Please upload a PDF, JPG, or PNG file.')
          return
        }
        
        uploadedFile.value = file
        uploadSuccess.value = false
      }
    }

    const removeFile = () => {
      if (!isUploading.value) {
        uploadedFile.value = null
        fileInput.value.value = ''
        uploadSuccess.value = false
      }
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileExtension = (filename) => {
      return filename.split('.').pop().toUpperCase()
    }

    const submitPaper = async () => {
      if (!uploadedFile.value || isUploading.value) return

      isUploading.value = true
      showProgressModal.value = true
      
      // Simulate upload and processing
      try {
        // In a real app, you would upload to your server here
        await new Promise(resolve => setTimeout(resolve, 2000))
        uploadSuccess.value = true
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        isUploading.value = false
      }
    }

    const viewSolutions = () => {
      // In a real app, navigate to solutions page
      showProgressModal.value = false
      uploadedFile.value = null
      fileInput.value.value = ''
      uploadSuccess.value = false
    }

    return {
      // Refs
      fileInput,
      uploadedFile,
      isDragging,
      uploadSuccess,
      isUploading,
      activeTab,
      cameraPreview,
      photoCanvas,
      capturedImage,
      cameraError,
      showProgressModal,
      
      // Methods
      openFilePicker,
      handleFileSelect,
      dragover,
      dragleave,
      drop,
      removeFile,
      formatFileSize,
      getFileExtension,
      submitPaper,
      viewSolutions,
      initCamera,
      takePhoto,
      retakePhoto,
      acceptPhoto,
      toggleCamera,
      switchTab
    }
  }
}
</script>

<style scoped>
/* Add any custom styles here */
.camera-preview {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
}

.camera-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.capture-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  border: 4px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.capture-btn-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
}

.switch-camera-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Animation for camera capture */
@keyframes flash {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.camera-flash {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  opacity: 0;
  pointer-events: none;
}

.camera-flash.active {
  animation: flash 0.5s;
}
</style>