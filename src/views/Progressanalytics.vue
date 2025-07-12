<template>
  <NavBar/>
  <div class="voice-section bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
    <!-- Header with animated icon -->
    <div class="flex items-center mb-6">
      <div class="relative">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </div>
        <div v-if="isListening" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
      </div>
      <h3 class="text-2xl font-bold text-gray-800">Voice Assistant</h3>
    </div>

    <!-- Language Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Response Language</label>
      <div class="flex space-x-4">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="selectedLanguage = lang.code"
          :class="{
            'bg-blue-600 text-white': selectedLanguage === lang.code,
            'bg-white text-gray-700 hover:bg-gray-100': selectedLanguage !== lang.code
          }"
          class="px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
        >
          <span class="mr-2">{{ lang.flag }}</span>
          {{ lang.name }}
        </button>
      </div>
    </div>

    <!-- Voice Input Section -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Ask your question</label>
      <div class="flex items-center">
        <button 
          @click="toggleVoiceInput"
          :class="{
            'bg-red-500 text-white': isListening,
            'bg-blue-600 text-white': !isListening
          }"
          class="p-3 rounded-full mr-3 transition-colors duration-300 hover:shadow-md"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isListening" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="flex-1 bg-white rounded-lg p-4 min-h-16 border border-gray-200">
          <p v-if="!userQuestion" class="text-gray-400 italic">Press the microphone and speak your question...</p>
          <p v-else class="text-gray-800">{{ userQuestion }}</p>
          <div v-if="isListening" class="mt-2 flex space-x-1">
            <div v-for="i in 3" :key="i" class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" :style="`animation-delay: ${i * 0.1}s`"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Response Section -->
    <div v-if="aiResponse" class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">AI Response</label>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <p class="text-gray-800 mb-4">{{ aiResponse }}</p>
        <div class="flex items-center">
          <button 
            @click="playAudioResponse"
            :disabled="isAudioPlaying"
            class="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors duration-300 flex items-center"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isAudioPlaying" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
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

<style scoped>
.voice-section {
  max-width: 800px;
  margin: 0 auto;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes ping {
  0% { transform: scale(0.8); opacity: 0.8; }
  70%, 100% { transform: scale(2); opacity: 0; }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
}
</style>
