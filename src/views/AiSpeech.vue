<template>
  <NavBar />
    <!-- Voice Assistant Card -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div class="relative">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div v-if="isListening" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">Voice Assistant</h3>
      </div>

      <!-- Language Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Response Language</label>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            @click="selectedLanguage = lang.code"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-200 flex items-center',
              selectedLanguage === lang.code 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            ]"
          >
            <span class="mr-2">{{ lang.flag }}</span>
            {{ lang.name }}
          </button>
        </div>
      </div>

      <!-- Voice Input -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Ask your question</label>
        <div class="flex items-start gap-3">
          <button 
            @click="toggleVoiceInput"
            :class="[
              'p-3 rounded-full transition-all duration-200 flex-shrink-0',
              isListening 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            ]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isListening" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="flex-1 bg-white rounded-lg p-4 min-h-16 border border-gray-200 shadow-inner">
            <p v-if="!userQuestion" class="text-gray-400 italic">Press the microphone and speak your question...</p>
            <p v-else class="text-gray-800">{{ userQuestion }}</p>
            <div v-if="isListening" class="mt-2 flex gap-1.5">
              <div v-for="i in 3" :key="i" class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" :style="`animation-delay: ${i * 0.1}s`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Response -->
      <div v-if="aiResponse" class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">AI Response</label>
        <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-inner">
          <p class="text-gray-800 mb-4">{{ aiResponse }}</p>
          <div class="flex items-center">
            <button 
              @click="playAudioResponse"
              :disabled="isAudioPlaying"
              class="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors duration-200 flex items-center"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isAudioPlaying" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <span class="ml-2 text-sm text-gray-500">
              {{ isAudioPlaying ? 'Playing...' : `Listen in ${selectedLanguage === 'sw' ? 'Swahili' : 'English'}` }}
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isProcessing" class="flex items-center justify-center py-6">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span class="ml-3 text-gray-600">Processing your question...</span>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Tiers -->
    <div class="space-y-6">
      <h3 class="text-2xl font-bold text-center text-gray-800">Choose Your Voice Experience</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Free Tier -->
        <div class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold">Basic Voice</h4>
          </div>
          <p class="text-gray-600 mb-4">Standard text-to-speech with clear but robotic voice quality.</p>
          <div class="mb-4">
            <span class="text-3xl font-bold">Free</span>
            <span class="text-gray-500">/ forever</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Standard text-to-speech</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>2 language options</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Limited to 5 queries/day</span>
            </li>
          </ul>
          <button class="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Current Plan
          </button>
        </div>

        <!-- Premium Tier -->
        <div class="border-2 border-blue-500 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 relative bg-white">
          <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold">Human-like Voice</h4>
          </div>
          <p class="text-gray-600 mb-4">Natural sounding voices with emotional expression and better pronunciation.</p>
          <div class="mb-4">
            <span class="text-3xl font-bold">$9.99</span>
            <span class="text-gray-500">/ month</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Human-like voice quality</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>5 language options</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>50 queries/day</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Emotion control (happy, sad, etc.)</span>
            </li>
          </ul>
          <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
            Upgrade Now
          </button>
        </div>

        <!-- Pro Tier -->
        <div class="border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-purple-50 to-white">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold">Pro Voice</h4>
          </div>
          <p class="text-gray-600 mb-4">Studio-quality voices with full customization and advanced features.</p>
          <div class="mb-4">
            <span class="text-3xl font-bold">$29.99</span>
            <span class="text-gray-500">/ month</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Studio-quality voice</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited languages</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited queries</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Voice cloning</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Advanced emotion control</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority support</span>
            </li>
          </ul>
          <button class="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md">
            Get Pro
          </button>
        </div>
      </div>

      <p class="text-center text-sm text-gray-500">
        All plans include our 14-day money-back guarantee. Enterprise solutions available.
      </p>
    </div>
  
  <Footer />
</template>

<script>
export default {
  data() {
    return {
      isListening: false,
      isProcessing: false,
      isAudioPlaying: false,
      userQuestion: '',
      aiResponse: '',
      error: '',
      selectedLanguage: 'en',
      languages: [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'sw', name: 'Swahili', flag: '🇰🇪' }
      ],
      audioContext: null,
      audioBuffer: null,
      mediaRecorder: null,
      audioChunks: [],
    };
  },
  methods: {
    async startRecording() {
      try {
        this.audioChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = e => {
          this.audioChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.sendAudioToBackend(audioBlob);
        };

        this.isListening = true;
      } catch (err) {
        this.error = "Could not access microphone: " + err.message;
      }
    },

    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
        this.isListening = false;
      }
    },

    toggleVoiceInput() {
      if (this.isListening) {
        this.stopRecording();
      } else {
        this.userQuestion = '';
        this.aiResponse = '';
        this.error = '';
        this.startRecording();
      }
    },

    async sendAudioToBackend(audioBlob) {
      this.isProcessing = true;
      this.error = '';
      const token = localStorage.getItem('accessToken'); 

      try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('language', this.selectedLanguage);

        const response = await fetch('https://web-production-d639.up.railway.app/api/voice-query/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          this.aiResponse = data.text_response || '';
          if (data.audio_response) {
            const audioData = Uint8Array.from(atob(data.audio_response), c => c.charCodeAt(0)).buffer;
            this.audioBuffer = await this.decodeAudioData(audioData);
          }
        } else {
          this.error = data.error || 'Failed to get response from server';
        }
      } catch (err) {
        this.error = 'Network error occurred. Please try again.';
        console.error(err);
      } finally {
        this.isProcessing = false;
      }
    },

    async decodeAudioData(audioData) {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      return await this.audioContext.decodeAudioData(audioData);
    },

    async playAudioResponse() {
      if (!this.audioBuffer || this.isAudioPlaying) return;

      this.isAudioPlaying = true;

      try {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);

        source.onended = () => {
          this.isAudioPlaying = false;
        };
      } catch (err) {
        this.error = 'Failed to play audio response';
        this.isAudioPlaying = false;
        console.error(err);
      }
    }
  },
};
</script>