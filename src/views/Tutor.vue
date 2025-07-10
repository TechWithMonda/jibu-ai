<template>
  <NavBar/>
  <div class="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-indigo-600 text-white p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 class="font-bold text-lg">AI Tutor</h2>
          <p class="text-xs opacity-80">Ready to help you learn</p>
        </div>
      </div>
      <button @click="resetChat" class="p-2 rounded-full hover:bg-indigo-700 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
    
    <!-- Messages container -->
    <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto space-y-4">
      <div v-for="(message, index) in messages" :key="index" class="flex" :class="{'justify-end': message.sender === 'user'}">
        <div class="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3" 
             :class="{
               'bg-indigo-100 text-indigo-900': message.sender === 'user',
               'bg-gray-100 text-gray-800': message.sender === 'bot',
               'border border-indigo-300': message.sender === 'user',
               'animate-pulse': message.type === 'typing'
             }">
          <div v-if="message.type === 'text'" class="prose prose-sm max-w-none" v-html="formatMessage(message.content)"></div>
          <div v-if="message.type === 'typing'" class="flex space-x-1 items-center">
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
      
      <div v-if="showSuggestions" class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        <button 
          v-for="(suggestion, idx) in suggestedQuestions" 
          :key="idx"
          @click="selectSuggestion(suggestion)"
          class="text-left p-2 bg-indigo-50 text-indigo-800 rounded-lg hover:bg-indigo-100 transition text-sm"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
    
    <!-- Input area -->
    <div class="border-t p-4 bg-gray-50">
      <div class="flex justify-center mb-3 space-x-2">
      <button 
  v-for="level in knowledgeLevels"
  :key="level.value"
  @click="setKnowledgeLevel(level.value)"
  class="text-xs px-3 py-1 rounded-full transition"
  :class="{
    'bg-indigo-600 text-white': knowledgeLevel === level.value,
    'bg-gray-200 text-gray-700 hover:bg-gray-300': knowledgeLevel !== level.value
  }"
>
  {{ level.label }}
</button>
      </div>
      
      <form @submit.prevent="sendMessage" class="flex space-x-2">
        <input
          v-model="userInput"
          type="text"
          placeholder="Ask your question..."
          class="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          :disabled="isTyping"
        >
        <button
          type="submit"
          class="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition disabled:opacity-50"
          :disabled="!userInput || isTyping"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </form>
      
      <div v-if="lastBotMessage" class="flex flex-wrap gap-2 mt-3 justify-center">
        <button
          v-for="action in quickActions"
          :key="action.label"
          @click="action.handler"
          class="text-xs px-3 py-1 rounded-full transition flex items-center"
          :class="{
            'bg-indigo-100 text-indigo-800 hover:bg-indigo-200': !action.primary,
            'bg-indigo-600 text-white hover:bg-indigo-700': action.primary
          }"
        >
          <span v-if="action.icon" class="mr-1">{{ action.icon }}</span>
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
  <Footer/>
</template>



<script>
import axios from 'axios';

function getAuthToken() {
  return localStorage.getItem("accessToken");
}

export default {
  name: 'AITutor',
  data() {
    return {
      userInput: '',
      messages: [
        {
          id: 1,
          sender: 'bot',
          type: 'text',
          content: 'Hello! I\'m your AI tutor. What subject would you like help with today?',
          timestamp: new Date()
        }
      ],
      isTyping: false,
      knowledgeLevel: 'intermediate',
      currentSubject: null,
      conversationId: null,
      apiEndpoint: 'https://web-production-d639.up.railway.app/api/tutor/',
      knowledgeLevels: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
      ],
      suggestedQuestions: [
        "Explain quantum physics basics",
        "How do I solve quadratic equations?",
        "What's the difference between DNA and RNA?",
        "Explain the French Revolution in simple terms"
      ],
      showSuggestions: true,
      quickActions: [
        { label: 'Simplify', icon: '🧠', handler: () => this.requestSimplification() },
        { label: 'Example', icon: '📚', handler: () => this.requestExample() },
        { label: 'Practice', icon: '✏️', handler: () => this.requestPractice() },
        { label: 'Related', icon: '🔗', handler: () => this.requestRelated(), primary: true }
      ]
    };
  },
  computed: {
    lastBotMessage() {
      const botMessages = this.messages.filter(m => m.sender === 'bot' && m.type === 'text');
      return botMessages.length > 0 ? botMessages[botMessages.length - 1] : null;
    }
  },
  methods: {
    formatMessage(content) {
      if (content == null) return '';
      if (typeof content === 'object') {
        try {
          content = JSON.stringify(content, null, 2);
        } catch {
          content = String(content);
        }
      }
      content = String(content);
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>')
        .replace(/\n/g, '<br>');
    },

    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      const userMessage = this.userInput.trim();
      this.userInput = '';
      
      this.addMessage('user', 'text', userMessage);
      this.showSuggestions = false;
      
      this.isTyping = true;
      const typingMsgId = this.addMessage('bot', 'typing');

      try {
        const token = getAuthToken();
        if (!token) throw new Error('Authentication required');

        const response = await axios.post(
          this.apiEndpoint,
          {
            message: userMessage,
            knowledge_level: this.knowledgeLevel,
            conversation_id: this.conversationId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 15000
          }
        );

        this.removeMessage(typingMsgId);
        
        if (response.data?.response) {
          this.addMessage('bot', 'text', response.data.response);
          this.conversationId = response.data.conversation_id || this.conversationId;
        } else {
          throw new Error('Empty response from server');
        }
      } catch (error) {
        this.removeMessage(typingMsgId);
        
        let errorMessage = 'Sorry, something went wrong. Please try again.';
        if (error.response) {
          if (error.response.data?.error?.knowledge_level) {
            errorMessage = `Invalid level: ${error.response.data.error.knowledge_level[0]}`;
          } else if (error.response.status === 401) {
            errorMessage = 'Please login again.';
          } else if (error.response.data?.error) {
            errorMessage = error.response.data.error;
          }
        }
        
        this.addMessage('bot', 'text', errorMessage);
      } finally {
        this.isTyping = false;
        this.scrollToBottom();
      }
       try {
    const response = await axios.post(
      this.apiEndpoint,
      {
        message: userMessage,
        knowledge_level: this.knowledgeLevel,
        conversation_id: this.conversationId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    this.removeMessage(typingMsgId);

    // Properly extract the AI response based on your API's structure
    let aiResponse = '';
    
    // If using direct OpenAI API response format:
    if (response.data?.choices?.[0]?.message?.content) {
      aiResponse = response.data.choices[0].message.content;
    }
    // If using your custom backend format:
    else if (response.data?.response) {
      aiResponse = response.data.response;
    }
    else {
      throw new Error('Unable to parse AI response');
    }

    // Add the clean response to messages
    this.addMessage('bot', 'text', aiResponse);
    this.conversationId = response.data.conversation_id || this.conversationId;

  } catch (error) {
    // ... existing error handling ...
  }
    },

    // [Keep all other methods unchanged]
    selectSuggestion(question) {
      this.userInput = question;
      this.showSuggestions = false;
      this.$nextTick(() => {
        document.querySelector('input').focus();
      });
    },

    setKnowledgeLevel(level) {
      this.knowledgeLevel = level;
      this.addMessage('bot', 'text', `Switched to ${level} level explanations.`);
    },

    addMessage(sender, type, content = '') {
      const message = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        sender,
        type,
        content,
        timestamp: new Date()
      };
      this.messages.push(message);
      this.scrollToBottom();
      return message.id;
    },

    removeMessage(messageId) {
      this.messages = this.messages.filter(m => m.id !== messageId);
    },

    removeTypingIndicator() {
      this.messages = this.messages.filter(m => m.type !== 'typing');
    },

    async requestRelated() {
      if (!this.lastBotMessage) return;
      this.userInput = `What are related concepts to: "${this.lastBotMessage.content.substring(0, 50)}..."`;
      await this.sendMessage();
    },

    async requestSimplification() {
      if (!this.lastBotMessage) return;
      this.userInput = `Explain simply: "${this.lastBotMessage.content.substring(0, 50)}..."`;
      await this.sendMessage();
    },

    async requestExample() {
      if (!this.lastBotMessage) return;
      this.userInput = `Give an example: "${this.lastBotMessage.content.substring(0, 50)}..."`;
      await this.sendMessage();
    },

    async requestPractice() {
      if (!this.lastBotMessage) return;
      this.userInput = `Give practice question: "${this.lastBotMessage.content.substring(0, 50)}..."`;
      await this.sendMessage();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    resetChat() {
      this.messages = [{
        id: Date.now(),
        sender: 'bot',
        type: 'text',
        content: 'Hello! I\'m your AI tutor. What would you like to learn about today?',
        timestamp: new Date()
      }];
      this.knowledgeLevel = 'intermediate';
      this.currentSubject = null;
      this.conversationId = null;
      this.showSuggestions = true;
    }
  }
};
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>