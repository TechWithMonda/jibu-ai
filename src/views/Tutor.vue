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
    
    <!-- Chat messages -->
    <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto space-y-4">
      <div v-for="(message, index) in messages" :key="index" class="flex" :class="{'justify-end': message.sender === 'user'}">
        <div class="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3" 
             :class="message.sender === 'user' ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-800'">
          <div v-if="message.type === 'text'" v-html="message.content"></div>
          <div v-if="message.type === 'typing'" class="flex space-x-1 items-center">
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Input area -->
    <div class="border-t p-4 bg-gray-50">
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
      
      <!-- Quick action buttons -->
      <div v-if="lastBotMessage" class="flex flex-wrap gap-2 mt-3">
        <button
          @click="requestSimplification"
          class="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          Simplify explanation
        </button>
        <button
          @click="requestExample"
          class="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          Give me an example
        </button>
        <button
          @click="requestPractice"
          class="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-200 transition"
        >
          Give me a practice question
        </button>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
export default {
  name: 'AITutor',
  data() {
    return {
      userInput: '',
      messages: [
        {
          sender: 'bot',
          type: 'text',
          content: 'Hello! I\'m your AI tutor. What would you like to learn about today?'
        }
      ],
      isTyping: false,
      conversationContext: [],
      knowledgeLevel: 'intermediate' // Can be 'beginner', 'intermediate', 'advanced'
    }
  },
  computed: {
    lastBotMessage() {
      const botMessages = this.messages.filter(m => m.sender === 'bot' && m.type === 'text');
      return botMessages.length > 0 ? botMessages[botMessages.length - 1] : null;
    }
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      // Add user message to chat
      this.messages.push({
        sender: 'user',
        type: 'text',
        content: this.userInput
      });
      
      const userQuestion = this.userInput;
      this.userInput = '';
      
      // Show typing indicator
      this.isTyping = true;
      this.messages.push({
        sender: 'bot',
        type: 'typing'
      });
      
      this.scrollToBottom();
      
      try {
        // In a real app, you would call your AI API here
        // For demo purposes, we'll simulate a response
        await this.simulateAIResponse(userQuestion);
      } catch (error) {
        console.error('Error getting AI response:', error);
        this.messages.push({
          sender: 'bot',
          type: 'text',
          content: 'Sorry, I encountered an error. Please try again.'
        });
      } finally {
        // Remove typing indicator
        this.messages = this.messages.filter(m => m.type !== 'typing');
        this.isTyping = false;
        this.scrollToBottom();
      }
      
      // Add to conversation context
      this.conversationContext.push({
        role: 'user',
        content: userQuestion
      });
    },
    
    async simulateAIResponse(question) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // This is where you'd normally process the question with your AI
      // For demo, we'll use some predefined responses
      let response = '';
      
      if (question.toLowerCase().includes('hello') || question.toLowerCase().includes('hi')) {
        response = 'Hello! How can I help you with your studies today?';
      } else if (question.toLowerCase().includes('math') || question.toLowerCase().includes('calculate')) {
        response = this.getMathResponse();
      } else if (question.toLowerCase().includes('science') || question.toLowerCase().includes('physics') || question.toLowerCase().includes('chemistry')) {
        response = this.getScienceResponse();
      } else if (question.toLowerCase().includes('history') || question.toLowerCase().includes('historical')) {
        response = this.getHistoryResponse();
      } else if (question.toLowerCase().includes('programming') || question.toLowerCase().includes('code')) {
        response = this.getProgrammingResponse();
      } else {
        response = `I understand you're asking about "${question}". Here's what I can tell you: Learning about ${question.split(' ')[0]} is fascinating. The key concepts involve...`;
      }
      
      this.messages.push({
        sender: 'bot',
        type: 'text',
        content: response
      });
      
      // Add to conversation context
      this.conversationContext.push({
        role: 'assistant',
        content: response
      });
    },
    
    requestSimplification() {
      if (!this.lastBotMessage) return;
      
      this.userInput = `Can you explain this in simpler terms? "${this.lastBotMessage.content.substring(0, 50)}..."`;
      this.sendMessage();
    },
    
    requestExample() {
      if (!this.lastBotMessage) return;
      
      this.userInput = `Can you give me an example related to this? "${this.lastBotMessage.content.substring(0, 50)}..."`;
      this.sendMessage();
    },
    
    requestPractice() {
      if (!this.lastBotMessage) return;
      
      this.userInput = `Can you give me a practice question about this? "${this.lastBotMessage.content.substring(0, 50)}..."`;
      this.sendMessage();
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    },
    
    resetChat() {
      this.messages = [{
        sender: 'bot',
        type: 'text',
        content: 'Hello! I\'m your AI tutor. What would you like to learn about today?'
      }];
      this.conversationContext = [];
      this.knowledgeLevel = 'intermediate';
    },
    
    // Demo response generators
    getMathResponse() {
      const responses = [
        "Math is the language of the universe! For your question about mathematics, let's break it down step by step. First, we need to understand the fundamental concepts before applying them to solve problems.",
        "When working with math problems, it's important to identify what you're being asked to find. Then recall the relevant formulas or theorems that can help you reach the solution.",
        "Mathematics builds on previous knowledge. Make sure you understand the basics before tackling more complex problems. Would you like me to explain any specific concept in more detail?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
    
    getScienceResponse() {
      const responses = [
        "Science helps us understand how the world works! The scientific method involves observation, hypothesis, experimentation, and conclusion. What specific area of science are you interested in?",
        "In physics, we study matter and energy and how they interact. Chemistry focuses on substances and their transformations. Biology examines living organisms. Which would you like to explore?",
        "Scientific concepts often build on each other. It's helpful to start with foundational ideas before moving to more advanced topics. Would you like me to simplify any scientific concept for you?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
    
    getHistoryResponse() {
      const responses = [
        "History helps us understand how past events shape our present. When studying history, consider the context - what was happening economically, socially, and politically at that time.",
        "Historical analysis often involves examining primary and secondary sources to understand different perspectives on events. Would you like to explore a specific historical period or event?",
        "Understanding cause and effect is crucial in history. Events rarely happen in isolation - they're usually the result of multiple factors. Would you like me to walk through a historical timeline with you?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
    
    getProgrammingResponse() {
      const responses = [
        "Programming is about solving problems with code. The key is to break down problems into smaller, manageable parts. What programming language or concept are you working with?",
        "When learning to code, practice is essential. Start with simple programs and gradually increase complexity. Debugging is a normal part of the process - don't get discouraged!",
        "Programming concepts like variables, loops, and functions are building blocks for more complex software. Would you like me to explain any specific programming concept with examples?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>