<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
<NavBar/> 

    <main class="container mx-auto px-4 py-8">
      <!-- Home Page -->
      <div v-if="activeTab === 'home'" class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <section class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">AI-Powered Exam Solutions</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers and detailed explanations for your exam questions using our advanced AI models.
          </p>
          <button 
            @click="activeTab = 'scanner'" 
            class="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Start Scanning Now
          </button>
        </section>

        <!-- Model Comparison -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Choose Your Analysis Model</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Basic Model -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <div class="bg-blue-600 text-white p-6">
                <h3 class="text-xl font-bold mb-2">Basic Model</h3>
                <p class="opacity-90">Quick answers for when you're in a hurry</p>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">Instant Answers</h4>
                    <p class="text-sm text-gray-600">Get solutions in seconds</p>
                  </div>
                </div>
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">Fast Processing</h4>
                    <p class="text-sm text-gray-600">~10 second response time</p>
                  </div>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg mt-6">
                  <h5 class="font-medium text-blue-800 mb-2">Best For:</h5>
                  <ul class="text-sm text-blue-700 space-y-1">
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Quick fact-checking</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Multiple choice questions</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>When you just need the answer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Standard Model -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition-colors transform hover:-translate-y-1">
              <div class="bg-purple-600 text-white p-6">
                <h3 class="text-xl font-bold mb-2">Standard Model</h3>
                <p class="opacity-90">Detailed explanations for better understanding</p>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">Step-by-Step</h4>
                    <p class="text-sm text-gray-600">Detailed solutions</p>
                  </div>
                </div>
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">Multiple Methods</h4>
                    <p class="text-sm text-gray-600">Different approaches shown</p>
                  </div>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg mt-6">
                  <h5 class="font-medium text-purple-800 mb-2">Best For:</h5>
                  <ul class="text-sm text-purple-700 space-y-1">
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Homework assignments</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Understanding concepts</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Math and science problems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Advanced Model -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:border-green-300 transition-colors">
              <div class="bg-green-600 text-white p-6">
                <h3 class="text-xl font-bold mb-2">Advanced Model</h3>
                <p class="opacity-90">Comprehensive analysis with references</p>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">Deep Analysis</h4>
                    <p class="text-sm text-gray-600">Thorough explanations</p>
                  </div>
                </div>
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium">References</h4>
                    <p class="text-sm text-gray-600">Citations and sources</p>
                  </div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg mt-6">
                  <h5 class="font-medium text-green-800 mb-2">Best For:</h5>
                  <ul class="text-sm text-green-700 space-y-1">
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Research papers</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Complex problems</span>
                    </li>
                    <li class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>When you need citations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- How It Works -->
        <section class="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Scan or Upload</h3>
              <p class="text-gray-600">Use your camera to scan exam papers or upload existing documents</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Select Model</h3>
              <p class="text-gray-600">Choose between Basic, Standard or Advanced analysis</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Get Results</h3>
              <p class="text-gray-600">Receive instant answers with your chosen level of detail</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Scanner Page -->
      <div v-if="activeTab === 'scanner'" class="max-w-4xl mx-auto">
        <!-- Scanner Section -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Scanner Tabs -->
          <div class="flex border-b border-gray-200">
            <button 
              @click="scannerMode = 'camera'"
              :class="{'text-blue-600 border-blue-600': scannerMode === 'camera', 'text-gray-500 hover:text-gray-700': scannerMode !== 'camera'}"
              class="py-3 px-6 font-medium border-b-2 -mb-px transition-colors flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Camera Scan
            </button>
            <button 
              @click="scannerMode = 'upload'"
              :class="{'text-blue-600 border-blue-600': scannerMode === 'upload', 'text-gray-500 hover:text-gray-700': scannerMode !== 'upload'}"
              class="py-3 px-6 font-medium border-b-2 -mb-px transition-colors flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Upload File
            </button>
          </div>

          <!-- Scanner Content -->
          <div class="p-6">
            <!-- Camera Scanner -->
            <div v-if="scannerMode === 'camera'" class="space-y-6">
              <!-- Camera Preview -->
              <div class="relative bg-black rounded-lg overflow-hidden" :style="{ height: '500px' }">
                <!-- Live Camera Feed -->
                <video 
                  ref="cameraPreview"
                  v-show="!capturedImage"
                  class="w-full h-full object-cover"
                  autoplay
                  playsinline
                ></video>
                
                <!-- Captured Image -->
                <div v-if="capturedImage" class="absolute inset-0 flex items-center justify-center bg-black">
                  <img :src="capturedImage" class="max-w-full max-h-full" alt="Captured document">
                </div>
                
                <!-- Scan Controls -->
                <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <!-- Capture Button -->
                  <button 
                    v-if="!capturedImage"
                    @click="captureDocument"
                    class="w-14 h-14 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
                  >
                    <div class="w-12 h-12 rounded-full bg-blue-500"></div>
                  </button>
                  
                  <!-- Flash Toggle -->
                  <button 
                    @click="toggleFlash"
                    class="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg"
                  >
                    <svg class="w-6 h-6" :class="{'text-yellow-400': flashOn, 'text-gray-500': !flashOn}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </button>
                  
                  <!-- Camera Switch -->
                  <button 
                    @click="toggleCamera"
                    class="w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg"
                  >
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- After Capture - Model Selection -->
              <div v-if="capturedImage && !processing" class="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-800 mb-4">Select Analysis Model</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <!-- Basic Model -->
                    <div 
                      @click="selectedModel = 'basic'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'basic', 'border-gray-200 hover:border-gray-300': selectedModel !== 'basic'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Basic</h4>
                      </div>
                      <p class="text-sm text-gray-600">Quick answers with minimal explanation</p>
                      <div class="mt-3 text-xs text-blue-600 font-medium">Processing time: ~10 seconds</div>
                    </div>
                    
                    <!-- Standard Model -->
                    <div 
                      @click="selectedModel = 'standard'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'standard', 'border-gray-200 hover:border-gray-300': selectedModel !== 'standard'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Standard</h4>
                      </div>
                      <p class="text-sm text-gray-600">Step-by-step solutions with explanations</p>
                      <div class="mt-3 text-xs text-purple-600 font-medium">Processing time: ~20 seconds</div>
                    </div>
                    
                    <!-- Advanced Model -->
                    <div 
                      @click="selectedModel = 'advanced'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'advanced', 'border-gray-200 hover:border-gray-300': selectedModel !== 'advanced'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Advanced</h4>
                      </div>
                      <p class="text-sm text-gray-600">Detailed analysis with references</p>
                      <div class="mt-3 text-xs text-green-600 font-medium">Processing time: ~30 seconds</div>
                    </div>
                  </div>
                  
                  <button 
                    @click="analyzeDocument"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Analyze with {{ selectedModel }} model
                  </button>
                  
                  <button 
                    @click="retakePhoto"
                    class="mt-3 w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Retake Photo
                  </button>
                </div>
              </div>
              
              <!-- Scanner Tips -->
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-blue-800 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Scanning Tips
                </h3>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Place document on a flat surface with good lighting</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Hold device parallel to the document for best results</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Ensure all edges are visible for automatic cropping</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- File Upload -->
            <div v-if="scannerMode === 'upload'" class="space-y-6">
              <div 
                @dragover.prevent="dragover"
                @dragleave.prevent="dragleave"
                @drop.prevent="drop"
                @click="openFilePicker"
                :class="{'border-blue-400 bg-blue-50': isDragging, 'border-green-400 bg-green-50': uploadSuccess}"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200"
              >
                <input 
                  type="file" 
                  ref="fileInput"
                  @change="handleFileSelect"
                  class="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                >
                
                <div class="relative w-16 h-16 mx-auto mb-4">
                  <svg 
                    v-if="!uploadedFile"
                    class="w-full h-full text-blue-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  
                  <img 
                    v-else-if="isImageFile(uploadedFile)"
                    :src="filePreview"
                    class="w-full h-full object-cover rounded-md"
                    alt="File preview"
                  >
                  
                  <div 
                    v-else
                    class="w-full h-full flex items-center justify-center bg-gray-100 rounded-md"
                  >
                    <span class="text-2xl font-bold text-gray-500">{{ getFileExtension(uploadedFile.name) }}</span>
                  </div>
                </div>
                
                <h3 class="text-lg font-medium text-gray-700 mb-2">
                  {{ uploadedFile ? uploadedFile.name : 'Drag & Drop Files Here' }}
                </h3>
                
                <p class="text-gray-500 mb-4" v-if="!uploadedFile">
                  or click to browse files (PDF, JPG, PNG up to 10MB)
                </p>
                
                <div v-if="uploadedFile" class="text-sm text-gray-500">
                  <span class="font-medium">{{ formatFileSize(uploadedFile.size) }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ uploadedFile.type || getFileExtension(uploadedFile.name) }}</span>
                </div>
                
                <div class="mt-4">
                  <button 
                    v-if="uploadedFile"
                    @click.stop="removeFile"
                    class="text-sm text-red-500 hover:text-red-700 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Remove File
                  </button>
                </div>
              </div>
              
              <!-- After Upload - Model Selection -->
              <div v-if="uploadedFile && !processing" class="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-800 mb-4">Select Analysis Model</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <!-- Basic Model -->
                    <div 
                      @click="selectedModel = 'basic'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'basic', 'border-gray-200 hover:border-gray-300': selectedModel !== 'basic'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Basic</h4>
                      </div>
                      <p class="text-sm text-gray-600">Quick answers with minimal explanation</p>
                      <div class="mt-3 text-xs text-blue-600 font-medium">Processing time: ~10 seconds</div>
                    </div>
                    
                    <!-- Standard Model -->
                    <div 
                      @click="selectedModel = 'standard'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'standard', 'border-gray-200 hover:border-gray-300': selectedModel !== 'standard'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Standard</h4>
                      </div>
                      <p class="text-sm text-gray-600">Step-by-step solutions with explanations</p>
                      <div class="mt-3 text-xs text-purple-600 font-medium">Processing time: ~20 seconds</div>
                    </div>
                    
                    <!-- Advanced Model -->
                    <div 
                      @click="selectedModel = 'advanced'"
                      :class="{'border-blue-500 bg-blue-50': selectedModel === 'advanced', 'border-gray-200 hover:border-gray-300': selectedModel !== 'advanced'}"
                      class="border-2 rounded-lg p-4 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center mb-2">
                        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <h4 class="font-medium">Advanced</h4>
                      </div>
                      <p class="text-sm text-gray-600">Detailed analysis with references</p>
                      <div class="mt-3 text-xs text-green-600 font-medium">Processing time: ~30 seconds</div>
                    </div>
                  </div>
                  
                  <button 
                    @click="analyzeDocument"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    :disabled="!uploadedFile"
                    :class="{'opacity-50 cursor-not-allowed': !uploadedFile}"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Analyze with {{ selectedModel }} model
                  </button>
                </div>
              </div>
              
              <!-- Upload Tips -->
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-blue-800 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Upload Tips
                </h3>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>For best results, upload clear, well-lit images</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>Multiple pages? Combine them into a single PDF</span>
                  </li>
                  <li class="flex items-start">
                    <span class="mr-2">•</span>
                    <span>File size limit: 10MB per file</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Processing Modal -->
    <div v-if="processing" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-xl font-medium text-gray-800 mb-2">Processing Your Document</h3>
          <p class="text-gray-600 mb-4">Using {{ selectedModel }} model to analyze your content...</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${progress}%` }"></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">{{ progress }}% complete</p>
        </div>
      </div>
    </div>

    <!-- Results Modal -->
    <div v-if="showResults" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-medium text-gray-800">Analysis Results</h3>
          <button @click="showResults = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-4 p-3 bg-blue-50 rounded-lg">
          <div class="flex items-center">
            <div class="mr-3 p-2 bg-blue-100 rounded-full">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-blue-800">Model Used: {{ selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1) }}</h4>
              <p class="text-sm text-blue-600">Processing time: {{ processingTime }} seconds</p>
            </div>
          </div>
        </div>
        
        <div class="prose max-w-none">
          <h4 class="text-lg font-medium mb-2">Document Analysis:</h4>
          <div v-html="analysisResults"></div>
        </div>
        
        <button 
          @click="startNewScan"
          class="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start New Scan
        </button>
      </div>
    </div>
  </div>
  <Footer/>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Navigation
      activeTab: 'home',
      
      // Scanner state
      scannerMode: 'camera',
      capturedImage: null,
      uploadedFile: null,
      filePreview: null,
      isDragging: false,
      uploadSuccess: false,
      
      // Camera controls
      flashOn: false,
      facingMode: 'environment',
      cameraError: null,
      stream: null,
      cameraReady: false,
      
      // Processing state
      selectedModel: 'standard',
      processing: false,
      progress: 0,
      processingTime: 0,
      showResults: false,
      analysisResults: '',
      progressInterval: null,
      
      // API configuration
      apiBaseUrl: 'https://web-production-d639.up.railway.app/api/analyze',
      authToken: localStorage.getItem('authToken') || null
    }
  },
  methods: {
    // Initialize camera when scanner mode is camera
    async initializeCamera() {
      try {
        // Stop any existing stream
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
          video: { 
            facingMode: this.facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        // Try to get camera with ideal constraints
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
          .catch(async () => {
            // Fallback to less strict constraints if ideal fails
            const fallbackConstraints = { video: { facingMode: this.facingMode } };
            return await navigator.mediaDevices.getUserMedia(fallbackConstraints);
          });
        
        this.$refs.cameraPreview.srcObject = this.stream;
        this.cameraReady = true;
        this.cameraError = null;
      } catch (error) {
        console.error('Camera error:', error);
        this.cameraError = 'Could not access camera. Please check permissions.';
        this.cameraReady = false;
        this.scannerMode = 'upload'; // Fallback to upload mode
      }
    },

    captureDocument() {
      if (!this.cameraReady) return;
      
      const video = this.$refs.cameraPreview;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Apply basic image processing for better OCR results
      ctx.filter = 'contrast(1.2) brightness(1.1)';
      ctx.drawImage(canvas, 0, 0);
      
      // Flash effect
      this.triggerFlashEffect();
      
      // Set captured image with higher quality
      this.capturedImage = canvas.toDataURL('image/jpeg', 0.9);
    },

    triggerFlashEffect() {
      const flash = document.createElement('div');
      flash.className = 'absolute inset-0 bg-white opacity-0';
      this.$refs.cameraPreview.parentNode.appendChild(flash);
      
      const animation = flash.animate(
        [{ opacity: 0 }, { opacity: 0.8 }, { opacity: 0 }],
        { duration: 300, easing: 'ease-out' }
      );
      
      animation.onfinish = () => flash.remove();
    },

    retakePhoto() {
      this.capturedImage = null;
    },
    
    toggleFlash() {
      this.flashOn = !this.flashOn;
    },
    
    async toggleCamera() {
      this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
      await this.initializeCamera();
    },
    
    // File upload methods
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    
    handleFileSelect(e) {
      const file = e.target.files[0];
      this.validateAndSetFile(file);
    },
    
    dragover() {
      this.isDragging = true;
    },
    
    dragleave() {
      this.isDragging = false;
    },
    
    drop(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      this.validateAndSetFile(file);
    },
    
    validateAndSetFile(file) {
      if (!file) return false;
      
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        this.showError('File Too Large', 'File size exceeds 10MB limit');
        return false;
      }
      
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const validExtensions = /\.(pdf|jpe?g|png)$/i;
      
      if (!validTypes.includes(file.type) && !file.name.match(validExtensions)) {
        this.showError('Invalid File Type', 'Please upload a PDF, JPG, or PNG file');
        return false;
      }
      
      this.uploadedFile = file;
      this.uploadSuccess = true;
      
      // Create preview for images
      if (this.isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
      
      return true;
    },

    isImageFile(file) {
      return file.type.match('image.*') || file.name.match(/\.(jpe?g|png)$/i);
    },
    
    removeFile() {
      this.uploadedFile = null;
      this.filePreview = null;
      this.$refs.fileInput.value = '';
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    getFileExtension(filename) {
      return filename.split('.').pop().toUpperCase();
    },
    
    // Analysis methods
    async analyzeDocument() {
      this.processing = true;
      this.progress = 0;
      this.processingTime = 0;
      
      // Start progress simulation
      this.progressInterval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += Math.floor(Math.random() * 10) + 5;
          this.processingTime += 0.5;
        }
      }, 500);

      try {
        const formData = new FormData();
        
        // Prepare the file for upload
        if (this.scannerMode === 'camera' && this.capturedImage) {
          const blob = await this.dataURLtoBlob(this.capturedImage);
          formData.append('file', blob, 'document.jpg');
        } else if (this.scannerMode === 'upload' && this.uploadedFile) {
          formData.append('file', this.uploadedFile);
        } else {
          throw new Error('No document provided');
        }

        // Add model type
        formData.append('model_type', this.selectedModel);

        // Call Django backend
        const response = await axios.post(
          this.apiBaseUrl,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${this.authToken}`
            },
            onUploadProgress: (progressEvent) => {
              this.progress = Math.min(
                90,
                Math.round((progressEvent.loaded * 90) / progressEvent.total)
              );
            }
          }
        );

        // Complete the progress
        this.progress = 100;
        clearInterval(this.progressInterval);

        // Process results
        this.analysisResults = this.formatApiResponse(response.data.result);
        this.processingTime = response.data.metadata?.processing_time || this.processingTime;
        this.showResults = true;

      } catch (error) {
        console.error('Analysis error:', error);
        clearInterval(this.progressInterval);
        this.showError(
          'Analysis Failed', 
          error.response?.data?.error || 'An error occurred during analysis'
        );
      } finally {
        this.processing = false;
      }
    },

    dataURLtoBlob(dataURL) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new Blob([u8arr], { type: mime });
    },

    formatApiResponse(text) {
      const html = text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return `<p>${html}</p>`;
    },

    startNewScan() {
      this.showResults = false;
      this.capturedImage = null;
      this.uploadedFile = null;
      this.filePreview = null;
      this.progress = 0;
      this.processingTime = 0;
      this.$refs.fileInput.value = '';
      
      if (this.scannerMode === 'camera') {
        this.initializeCamera();
      }
    },

    showError(title, message) {
      // Using alert for simplicity - replace with your notification system
      alert(`${title}: ${message}`);
    }
  },
  watch: {
    scannerMode(newVal) {
      if (newVal === 'camera') {
        this.$nextTick(() => {
          this.initializeCamera();
        });
      } else if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  },
  mounted() {
    if (this.scannerMode === 'camera') {
      this.initializeCamera();
    }
  },
  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}
</script>


<style>
/* Animation for camera flash */
@keyframes flash {
  0% { opacity: 0; }
  50% { opacity: 0.8; }
  100% { opacity: 0; }
}

.prose {
  line-height: 1.5;
}

.prose h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prose h6 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}

.prose p {
  margin-bottom: 0.5rem;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
}

.transition-transform {
  transition-property: transform;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* Custom scrollbar for results modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>