<template>
  <NavBar/>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-blue-800 mb-2">Upload Your Exam Paper</h2>
        <p class="text-lg text-gray-600">
          Upload scanned copies or PDFs of KCSE/KCPE past papers for instant AI solutions
        </p>
      </div>

      <!-- Upload Card -->
      <div class="bg-white rounded-xl shadow-lg border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300">
        <div class="p-8 md:p-12">
          <!-- Drag and Drop Area -->
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
            
            <!-- Upload Icon with Animation -->
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
              
              <!-- Uploading Animation -->
              <div v-if="isUploading" class="w-full h-full flex items-center justify-center">
                <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              
              <!-- Success Icon -->
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
            
            <!-- File Info -->
            <div v-if="uploadedFile" class="text-sm text-gray-500 mb-2">
              <span class="font-medium">Size:</span> {{ formatFileSize(uploadedFile.size) }}
              <span class="mx-2">•</span>
              <span class="font-medium">Type:</span> {{ uploadedFile.type || getFileExtension(uploadedFile.name) }}
            </div>
            
            <!-- Action Buttons -->
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

          <!-- Advanced Options Accordion -->
          <div class="mt-6 border border-gray-200 rounded-lg overflow-hidden">
            <button 
              @click="showAdvancedOptions = !showAdvancedOptions"
              class="w-full flex justify-between items-center p-4 text-left text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <span class="font-medium">Advanced Options</span>
              <svg 
                class="w-5 h-5 transition-transform duration-200"
                :class="{'transform rotate-180': showAdvancedOptions}"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div v-if="showAdvancedOptions" class="p-4 border-t border-gray-200 bg-gray-50">
              <!-- Language Selection -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Explanation Language</label>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    @click="selectedLanguage = 'english'"
                    :class="{
                      'bg-blue-600 text-white': selectedLanguage === 'english', 
                      'bg-gray-100 text-gray-700 hover:bg-gray-200': selectedLanguage !== 'english'
                    }"
                    class="py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span class="mr-2">🇬🇧</span> English
                  </button>
                  <button
                    @click="selectedLanguage = 'swahili'"
                    :class="{
                      'bg-blue-600 text-white': selectedLanguage === 'swahili', 
                      'bg-gray-100 text-gray-700 hover:bg-gray-200': selectedLanguage !== 'swahili'
                    }"
                    class="py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span class="mr-2">🇰🇪</span> Swahili
                  </button>
                </div>
              </div>

              <!-- Subject Selection -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  v-model="selectedSubject"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Auto-detect (Recommended)</option>
                  <optgroup v-for="(group, index) in groupedSubjects" :label="group.category" :key="index">
                    <option v-for="subject in group.subjects" :value="subject.value" :key="subject.value">
                      {{ subject.label }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <!-- Year Selection -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Exam Year</label>
                <select 
                  v-model="selectedYear"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Auto-detect</option>
                  <option v-for="year in availableYears" :value="year" :key="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <!-- Explanation Detail Level -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Explanation Detail</label>
                <div class="flex items-center space-x-4">
                  <div 
                    v-for="level in detailLevels" 
                    :key="level.value"
                    @click="selectedDetailLevel = level.value"
                    :class="{
                      'border-blue-500 bg-blue-50': selectedDetailLevel === level.value,
                      'border-gray-200 hover:border-gray-300': selectedDetailLevel !== level.value
                    }"
                    class="border rounded-lg p-3 cursor-pointer transition-colors flex-1 text-center"
                  >
                    <h4 class="font-medium text-gray-800">{{ level.label }}</h4>
                    <p class="text-xs text-gray-500 mt-1">{{ level.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button with Enhanced State Handling -->
          <div class="mt-8">
            <button
              @click="submitPaper"
              :disabled="!uploadedFile || isUploading"
              :class="{
                'bg-blue-600 hover:bg-blue-700': uploadedFile && !isUploading,
                'bg-green-600 hover:bg-green-700': uploadSuccess,
                'bg-gray-400 cursor-not-allowed': !uploadedFile || isUploading
              }"
              class="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-md transition-colors duration-300 flex items-center justify-center"
            >
              <span v-if="isUploading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else-if="uploadSuccess">View Solutions</span>
              <span v-else>Get AI Solutions</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div class="text-blue-600 mb-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-blue-800 mb-2">Accurate Solutions</h3>
          <p class="text-gray-600">Our AI provides 98% accurate solutions verified by education experts.</p>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div class="text-blue-600 mb-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-blue-800 mb-2">Instant Results</h3>
          <p class="text-gray-600">Get detailed solutions within minutes of uploading your paper.</p>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div class="text-blue-600 mb-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-blue-800 mb-2">Cloud Storage</h3>
          <p class="text-gray-600">Your papers are securely stored for future reference and revision.</p>
        </div>
      </div>
    </div>

    <!-- Enhanced Upload Progress Modal -->
    <div v-if="showProgressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Processing Your Paper</h3>
          <button @click="cancelUpload" v-if="!uploadComplete" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Progress Steps -->
        <div class="mb-6">
          <div class="flex justify-between text-xs text-gray-500 mb-2">
            <span :class="{'text-blue-600 font-medium': currentStep >= 1}">Uploading</span>
            <span :class="{'text-blue-600 font-medium': currentStep >= 2}">Analyzing</span>
            <span :class="{'text-blue-600 font-medium': currentStep >= 3}">Processing</span>
            <span :class="{'text-blue-600 font-medium': currentStep >= 4}">Complete</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div 
              class="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
              :style="{ width: stepProgress + '%' }"
            ></div>
          </div>
        </div>
        
        <!-- Detailed Progress -->
        <div class="space-y-4 mb-6">
          <div v-for="(task, index) in progressTasks" :key="index" class="flex items-start">
            <div class="mr-3 mt-0.5">
              <svg 
                v-if="task.completed" 
                class="w-4 h-4 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div v-else-if="task.active" class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div v-else class="w-4 h-4 border border-gray-300 rounded-full"></div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-700">{{ task.name }}</p>
              <p v-if="task.description" class="text-xs text-gray-500">{{ task.description }}</p>
            </div>
            <span class="text-xs text-gray-500">{{ task.completed ? 'Done' : task.active ? 'In progress' : 'Pending' }}</span>
          </div>
        </div>
        
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700">
                <span class="font-medium">Tip:</span> You can continue browsing other pages while we process your paper. We'll notify you when it's ready.
              </p>
            </div>
          </div>
        </div>
        
        <button 
          v-if="uploadComplete"
          @click="closeModal"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
        >
          View Solutions Now
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup>
import { ref, computed } from 'vue';

// Refs for file handling
const fileInput = ref(null);
const uploadedFile = ref(null);
const isDragging = ref(false);
const uploadSuccess = ref(false);

// Refs for user selections
const selectedLanguage = ref('english');
const selectedSubject = ref('');
const selectedYear = ref('');
const selectedDetailLevel = ref('standard');
const showAdvancedOptions = ref(false);

// Refs for upload state
const isUploading = ref(false);
const showProgressModal = ref(false);
const uploadProgress = ref(0);
const uploadComplete = ref(false);
const currentStep = ref(1);
const stepProgress = ref(0);
const cancelledUpload = ref(false);

// Progress tasks
const progressTasks = ref([
  { name: 'Uploading file', description: 'Transferring to our secure servers', completed: false, active: false },
  { name: 'Extracting text', description: 'Reading questions and diagrams', completed: false, active: false },
  { name: 'Identifying subject', description: 'Determining exam type and subject', completed: false, active: false },
  { name: 'Generating solutions', description: 'Creating step-by-step answers', completed: false, active: false },
  { name: 'Quality check', description: 'Verifying accuracy of solutions', completed: false, active: false }
]);

// Available options
const groupedSubjects = [
  {
    category: 'Sciences',
    subjects: [
      { value: 'math', label: 'Mathematics' },
      { value: 'physics', label: 'Physics' },
      { value: 'chemistry', label: 'Chemistry' },
      { value: 'biology', label: 'Biology' }
    ]
  },
  {
    category: 'Languages',
    subjects: [
      { value: 'english', label: 'English' },
      { value: 'kiswahili', label: 'Kiswahili' },
      { value: 'french', label: 'French' }
    ]
  },
  {
    category: 'Humanities',
    subjects: [
      { value: 'history', label: 'History' },
      { value: 'geography', label: 'Geography' },
      { value: 'cre', label: 'CRE' },
      { value: 'ire', label: 'IRE' }
    ]
  },
  {
    category: 'Technical',
    subjects: [
      { value: 'business', label: 'Business Studies' },
      { value: 'agriculture', label: 'Agriculture' },
      { value: 'computer', label: 'Computer Studies' }
    ]
  }
];

const availableYears = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({length: 20}, (_, i) => currentYear - i);
});

const detailLevels = [
  {
    value: 'basic',
    label: 'Basic',
    description: 'Key steps only'
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Detailed steps'
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'With explanations'
  }
];

// Methods
const openFilePicker = () => {
  if (!isUploading.value) {
    fileInput.value.click();
  }
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    const file = files[0];
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please choose a smaller file.');
      return;
    }
    
    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }
    
    uploadedFile.value = file;
    uploadSuccess.value = false;
  }
};

const dragover = () => {
  if (!isUploading.value) {
    isDragging.value = true;
  }
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  isDragging.value = false;
  if (isUploading.value) return;
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    
    // Same validation as in handleFileSelect
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please choose a smaller file.');
      return;
    }
    
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
      alert('Please upload a PDF, JPG, or PNG file.');
      return;
    }
    
    uploadedFile.value = file;
    uploadSuccess.value = false;
  }
};

const removeFile = () => {
  if (!isUploading.value) {
    uploadedFile.value = null;
    fileInput.value.value = '';
    uploadSuccess.value = false;
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileExtension = (filename) => {
  return filename.split('.').pop().toUpperCase();
};

const submitPaper = async () => {
  if (!uploadedFile.value || isUploading.value) return;

  // Reset states
  isUploading.value = true;
  uploadSuccess.value = false;
  showProgressModal.value = true;
  uploadProgress.value = 0;
  currentStep.value = 1;
  stepProgress.value = 0;
  cancelledUpload.value = false;
  
  // Reset progress tasks
  progressTasks.value = progressTasks.value.map(task => ({
    ...task,
    completed: false,
    active: false
  }));
  
  // Simulate upload process
  try {
    // Step 1: Uploading file
    progressTasks.value[0].active = true;
    await simulateProgress(20, 1500);
    if (cancelledUpload.value) return;
    progressTasks.value[0].active = false;
    progressTasks.value[0].completed = true;
    currentStep.value = 2;
    stepProgress.value = 25;
    
    // Step 2: Extracting text
    progressTasks.value[1].active = true;
    await simulateProgress(40, 2000);
    if (cancelledUpload.value) return;
    progressTasks.value[1].active = false;
    progressTasks.value[1].completed = true;
    currentStep.value = 3;
    stepProgress.value = 50;
    
    // Step 3: Identifying subject
    progressTasks.value[2].active = true;
    await simulateProgress(60, 1000);
    if (cancelledUpload.value) return;
    progressTasks.value[2].active = false;
    progressTasks.value[2].completed = true;
    currentStep.value = 4;
    stepProgress.value = 75;
    
    // Step 4: Generating solutions
    progressTasks.value[3].active = true;
    await simulateProgress(80, 2500);
    if (cancelledUpload.value) return;
    progressTasks.value[3].active = false;
    progressTasks.value[3].completed = true;
    
    // Step 5: Quality check
    progressTasks.value[4].active = true;
    await simulateProgress(100, 1500);
    if (cancelledUpload.value) return;
    progressTasks.value[4].active = false;
    progressTasks.value[4].completed = true;
    
    // Complete
    uploadComplete.value = true;
    uploadSuccess.value = true;
    stepProgress.value = 100;
  } catch (error) {
    console.error('Upload error:', error);
  } finally {
    isUploading.value = false;
  }
};

const simulateProgress = async (targetProgress, duration) => {
  const startProgress = uploadProgress.value;
  const startTime = Date.now();
  const endTime = startTime + duration;
  
  return new Promise((resolve) => {
    const updateProgress = () => {
      if (cancelledUpload.value) {
        resolve();
        return;
      }
      
      const now = Date.now();
      const progress = Math.min(
        startProgress + (targetProgress - startProgress) * (now - startTime) / duration,
        targetProgress
      );
      
      uploadProgress.value = Math.round(progress);
      
      if (now < endTime) {
        requestAnimationFrame(updateProgress);
      } else {
        uploadProgress.value = targetProgress;
        resolve();
      }
    };
    
    requestAnimationFrame(updateProgress);
  });
};

const cancelUpload = () => {
  cancelledUpload.value = true;
  isUploading.value = false;
  showProgressModal.value = false;
  uploadProgress.value = 0;
  currentStep.value = 1;
  stepProgress.value = 0;
  
  // Reset progress tasks
  progressTasks.value = progressTasks.value.map(task => ({
    ...task,
    completed: false,
    active: false
  }));
};

const closeModal = () => {
  showProgressModal.value = false;
  // In a real app, you would navigate to the solutions page here
};

const viewSolutions = () => {
  // In a real app, you would navigate to the solutions page here
  showProgressModal.value = false;
  // Reset for next upload
  uploadedFile.value = null;
  fileInput.value.value = '';
  uploadSuccess.value = false;
};
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions for drag and drop */
.drag-drop-area {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Custom scrollbar for dropdowns */
select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>