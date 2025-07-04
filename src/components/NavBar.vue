<template>
  <header class="sticky top-0 z-50 bg-blue-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <svg class="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">Jibu AI</h1>
      </div>
      
      <nav class="hidden md:flex items-center space-x-8">
        <a href="#features" class="text-blue-100 hover:text-white transition-colors duration-300">Features</a>
        <a href="#how-it-works" class="text-blue-100 hover:text-white transition-colors duration-300">How It Works</a>
        <a href="#testimonials" class="text-blue-100 hover:text-white transition-colors duration-300">Testimonials</a>
        <a href="#pricing" class="text-blue-100 hover:text-white transition-colors duration-300">Pricing</a>
      </nav>
      
      <div class="flex items-center space-x-4">
        <router-link to="login">
        <button class="hidden md:block bg-transparent border border-blue-300 text-blue-100 px-4 py-2 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-105">
          Login
        </button>
        </router-link>
        <router-link to="signup" >
        <button class="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
          Sign Up Free
        </button>
        </router-link>
        <button @click="toggleMobileMenu" class="md:hidden text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-blue-800 px-6 py-4">
      <div class="flex flex-col space-y-4">
        <a href="#features" class="text-blue-100 hover:text-white" @click="toggleMobileMenu">Features</a>
        <a href="#how-it-works" class="text-blue-100 hover:text-white" @click="toggleMobileMenu">How It Works</a>
        <a href="#testimonials" class="text-blue-100 hover:text-white" @click="toggleMobileMenu">Testimonials</a>
        <a href="#pricing" class="text-blue-100 hover:text-white" @click="toggleMobileMenu">Pricing</a>
        <router-link to="login" >
        <button class="bg-white text-blue-700 px-4 py-2 rounded-lg mt-2">Login</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
/* Add any specific navbar styles here */
</style>