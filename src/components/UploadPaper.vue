<template>
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
            :class="{'bg-blue-50 border-blue-400': isDragging}"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200"
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
            
            <svg class="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              {{ uploadedFile ? uploadedFile.name : 'Drag & Drop Files Here' }}
            </h3>
            
            <p class="text-gray-500 mb-4" v-if="!uploadedFile">
              or click to browse files
            </p>
            
            <button 
              v-if="uploadedFile"
              @click.stop="removeFile"
              class="text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-center mx-auto"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Remove file
            </button>
          </div>

          <!-- Language Selection -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Explanation Language</label>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="selectedLanguage = 'english'"
                :class="{'bg-blue-600 text-white': selectedLanguage === 'english', 'bg-gray-100 text-gray-700': selectedLanguage !== 'english'}"
                class="py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <span class="mr-2">🇬🇧</span> English
              </button>
              <button
                @click="selectedLanguage = 'swahili'"
                :class="{'bg-blue-600 text-white': selectedLanguage === 'swahili', 'bg-gray-100 text-gray-700': selectedLanguage !== 'swahili'}"
                class="py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <span class="mr-2">🇰🇪</span> Swahili
              </button>
            </div>
          </div>

          <!-- Subject Selection -->
          <div class="mt-6" v-if="showSubjectDropdown">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
            <select 
              v-model="selectedSubject"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select Subject --</option>
              <option v-for="subject in subjects" :value="subject.value" :key="subject.value">
                {{ subject.label }}
              </option>
            </select>
          </div>

          <!-- Submit Button -->
          <div class="mt-8">
            <button
              @click="submitPaper"
              :disabled="!uploadedFile"
              :class="{'bg-blue-600 hover:bg-blue-700': uploadedFile, 'bg-gray-400 cursor-not-allowed': !uploadedFile}"
              class="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-md transition-colors duration-300"
            >
              {{ isUploading ? 'Processing...' : 'Get AI Solutions' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Supported Formats -->
      <div class="mt-4 text-center text-sm text-gray-500">
        <p>Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
      </div>
    </div>

    <!-- Upload Progress Modal -->
    <div v-if="showProgressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Processing Your Paper</h3>
        
        <div class="mb-4">
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-blue-600 h-2.5 rounded-full" 
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>

        <p class="text-gray-600 mb-6">
          Our AI is analyzing your paper and generating solutions. This may take a few moments...
        </p>

        <button 
          v-if="uploadComplete"
          @click="closeModal"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Solutions
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const uploadedFile = ref(null);
const isDragging = ref(false);
const selectedLanguage = ref('english');
const selectedSubject = ref('');
const isUploading = ref(false);
const showProgressModal = ref(false);
const uploadProgress = ref(0);
const uploadComplete = ref(false);
const showSubjectDropdown = ref(true);

const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'kiswahili', label: 'Kiswahili' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'cre', label: 'CRE' },
  { value: 'business', label: 'Business Studies' },
  { value: 'agriculture', label: 'Agriculture' },
];

const openFilePicker = () => {
  fileInput.value.click();
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    uploadedFile.value = files[0];
  }
};

const dragover = () => {
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  isDragging.value = false;
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    uploadedFile.value = files[0];
  }
};

const removeFile = () => {
  uploadedFile.value = null;
  fileInput.value.value = '';
};

const submitPaper = () => {
  if (!uploadedFile.value) return;

  isUploading.value = true;
  showProgressModal.value = true;

  // Simulate upload progress
  const interval = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += 10;
    } else {
      clearInterval(interval);
      uploadComplete.value = true;
      isUploading.value = false;
    }
  }, 300);
};

const closeModal = () => {
  showProgressModal.value = false;
  uploadProgress.value = 0;
  uploadComplete.value = false;
  // Here you would typically navigate to the solutions page
};
</script>

<style scoped>
/* Custom styles can be added here */
</style>