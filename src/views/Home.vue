<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 font-sans">
    <!-- Header with sticky navigation -->
    <NavBar/>
    <!-- Hero Section with animated gradient -->
    <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20"></div>
      </div>
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
            Your AI-Powered Exam Assistant for <span class="text-yellow-300">studying </span>
          </h2>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in delay-100">
            Upload past papers, get instant solutions with step-by-step explanations, and learn in Swahili or English. 
            <span class="font-semibold">Jibu AI helps you master exams with confidence.</span>
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <button class="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Try It Free Now
            </button>
            <button class="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-800 transition-all duration-300 hover:scale-105">
              Watch Demo Video
            </button>
          </div>
          <div class="mt-10 animate-bounce-slow">
            <svg class="w-10 h-10 mx-auto text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-6">
        <p class="text-center text-gray-500 mb-8">Trusted by students from top schools in Kenya</p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          <div class="w-24 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2">
            <span class="font-bold text-blue-700">Alliance</span>
          </div>
          <div class="w-24 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2">
            <span class="font-bold text-blue-700">Mangu</span>
          </div>
          <div class="w-24 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2">
            <span class="font-bold text-blue-700">Maseno</span>
          </div>
          <div class="w-24 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2">
            <span class="font-bold text-blue-700">Starehe</span>
          </div>
          <div class="w-24 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2">
            <span class="font-bold text-blue-700">Pangani</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Upload Feature Section with card -->
    <section id="how-it-works" class="py-20 bg-gradient-to-b from-white to-blue-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">How Jibu AI Works</h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Transform your study sessions in just three simple steps</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span class="text-2xl font-bold text-blue-700">1</span>
            </div>
            <h4 class="text-xl font-bold mb-4 text-center">Upload Your Paper</h4>
            <p class="text-gray-600 text-center">Scan or upload a PDF of any past paper or assignment</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span class="text-2xl font-bold text-blue-700">2</span>
            </div>
            <h4 class="text-xl font-bold mb-4 text-center">AI Processes Content</h4>
            <p class="text-gray-600 text-center">Our advanced AI analyzes and understands the questions</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span class="text-2xl font-bold text-blue-700">3</span>
            </div>
            <h4 class="text-xl font-bold mb-4 text-center">Get Solutions</h4>
            <p class="text-gray-600 text-center">Receive detailed, step-by-step solutions in your preferred language</p>
          </div>
        </div>
        
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/2 bg-blue-700 p-8 text-white flex flex-col justify-center">
              <h4 class="text-2xl font-bold mb-4">Try It Yourself</h4>
              <p class="mb-6">Upload a sample paper and see Jibu AI in action. No registration required!</p>
              <div class="flex flex-col space-y-4">
                <router-link to="/uploadpaper" class="flex flex-col space-y-">
                  <button class="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-all">
                    Upload Paper
                  </button>
                </router-link>
                
                <button class="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
                  View Sample Solutions
                </button>
              </div>
            </div>
           
            <div class="md:w-1/2 p-8">
              <div class="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center">
                <!-- Camera icon instead of upload icon -->
                <svg class="w-16 h-16 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h5 class="font-bold text-lg mb-2">Scan Document</h5>
                <p class="text-gray-500 mb-4">Position your document within the frame</p>
                
                <!-- Camera preview placeholder -->
                <div class="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center rounded-lg overflow-hidden">
                  <div class="relative w-full h-full">
                    <!-- This would be where the camera feed appears -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="border-2 border-blue-400 border-dashed w-3/4 h-3/4"></div>
                    </div>
                  </div>
                </div>
                
                <router-link to="/uploadpaper">
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Capture Scan
                  </button>
                </router-link>
                <p class="text-xs text-gray-400 mt-4">Or upload an existing file</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section with tabs -->
    <section id="features" class="py-20 bg-blue-600 text-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">Why Jibu AI Stands Out</h3>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">More than just answers - a complete learning companion</p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-wrap justify-center mb-8">
            <button 
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="activeTab = index"
              :class="{'bg-white text-blue-700': activeTab === index, 'text-blue-100 hover:text-white': activeTab !== index}"
              class="px-6 py-3 rounded-t-lg font-medium transition-colors duration-300"
            >
              {{ tab.title }}
            </button>
          </div>
          
          <div class="bg-white rounded-b-lg rounded-tr-lg shadow-2xl overflow-hidden">
            <div class="md:flex">
              <div class="md:w-1/2 p-8 md:p-12">
                <h4 class="text-2xl font-bold text-gray-800 mb-4">{{ tabs[activeTab].title }}</h4>
                <p class="text-gray-600 mb-6">{{ tabs[activeTab].description }}</p>
                <ul class="space-y-3">
                  <li v-for="(feature, i) in tabs[activeTab].features" :key="i" class="flex items-start">
                    <svg class="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </li>
                </ul>
              </div>
              <div class="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
                <img 
                  :src="tabs[activeTab].image" 
                  :alt="tabs[activeTab].title" 
                  class="rounded-lg shadow-md w-full h-auto max-h-80 object-contain"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Supercharge Learning Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">Supercharge Your Learning</h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover 15 powerful features designed to optimize your study sessions, boost retention, and maximize academic performance.
          </p>
        </div>

        <!-- Interactive Feature Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1: AI Study Recommendations -->
          <router-link to="/aistudy">
            <div
              @mouseenter="hoveredFeature = 1"
              @mouseleave="hoveredFeature = null"
              class="bg-blue-50 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              :class="{'ring-2 ring-blue-500': hoveredFeature === 1}"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-2xl">✨</span>
                </div>
                <h4 class="text-xl font-bold">AI Study Recommendations</h4>
              </div>
              <p class="text-gray-600 mb-4">Get personalized schedule suggestions based on your courses, deadlines, and performance.</p>
              <div class="flex flex-wrap gap-2">
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Smart Scheduling</span>
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Performance Analysis</span>
              </div>
            </div>
          </router-link>

          <!-- Feature 2: Focus Timer -->
          <router-link to="/timer">
            <div
              @mouseenter="hoveredFeature = 2"
              @mouseleave="hoveredFeature = null"
              class="bg-blue-50 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              :class="{'ring-2 ring-blue-500': hoveredFeature === 2}"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-2xl">⏱️</span>
                </div>
                <h4 class="text-xl font-bold">Focus Timer</h4>
              </div>
              <p class="text-gray-600 mb-4">Built-in Pomodoro timer with customizable work/break intervals and session tracking.</p>
              <div class="flex flex-wrap gap-2">
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Productivity</span>
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Time Management</span>
              </div>
            </div>
          </router-link>

          <!-- Feature 3: Progress Analytics -->
       <router-link to="/aispeech">
  <div
    @mouseenter="hoveredFeature = 4"
    @mouseleave="hoveredFeature = null"
    class="bg-purple-50 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
    :class="{'ring-2 ring-purple-500': hoveredFeature === 4}"
  >
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
        <span class="text-2xl">🗣️</span>
      </div>
      <h4 class="text-xl font-bold">AI Speech Assistant</h4>
    </div>
    <p class="text-gray-600 mb-4">Ask questions in English or Kiswahili and get answers in both languages with our intelligent voice assistant.</p>
    <div class="flex flex-wrap gap-2">
      <span class="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Bilingual AI</span>
      <span class="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Voice Interaction</span>
      <span class="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">English/Kiswahili</span>
    </div>
  </div>
</router-link>
          <!-- Feature 4: quizAi -->
<router-link to="/quizai">
  <div
    class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    @mouseenter="activeFeature = 'quiz'"
  >
    <div class="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative">
      <!-- Animated trophy and progress elements -->
      <div class="absolute top-4 right-4 trophy-icon bg-yellow-100 text-yellow-600 p-2 rounded-full shadow-sm">
        🏆
      </div>
      <div class="quiz-preview w-40 h-28 bg-white rounded-lg shadow-md transform -rotate-2 transition-transform duration-300 hover:rotate-0">
        <div class="absolute inset-0 bg-white flex flex-col items-center justify-center p-4">
          <div class="streak-display flex items-center mb-2">
            <span class="fire-icon mr-1">🔥</span>
            <span class="text-sm font-bold">7 day streak</span>
          </div>
          <span class="text-center text-sm">Daily AI Quiz</span>
        </div>
      </div>
      <div class="absolute bottom-4 left-4 rank-badge bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        Rank #42
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 flex items-center">
        <span class="icon-box bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">🧠</span>
        AI Quiz Challenge
      </h3>
      <p class="text-gray-600 mb-4">
        Daily gamified quizzes with streaks, leaderboards, and rewards to test your AI knowledge.
      </p>
      <div class="flex flex-wrap gap-2">
        <span class="feature-tag">Daily Challenges</span>
        <span class="feature-tag">Leaderboards</span>
        <span class="feature-tag">Airtime Rewards</span>
      </div>
    </div>
  </div>
</router-link>

          <!-- Feature 5: Resource Library -->
          <router-link to="/resources">
            <div
              @mouseenter="hoveredFeature = 5"
              @mouseleave="hoveredFeature = null"
              class="bg-blue-50 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              :class="{'ring-2 ring-blue-500': hoveredFeature === 5}"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-2xl">📚</span>
                </div>
                <h4 class="text-xl font-bold">Resource Library</h4>
              </div>
              <p class="text-gray-600 mb-4">Organized repository for all your study materials - PDFs, videos, links, and more.</p>
              <div class="flex flex-wrap gap-2">
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Cloud Storage</span>
                <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Organization</span>
              </div>
            </div>
          </router-link>

          <!-- Feature 6: Study Groups -->
          <router-link to="/tutor">
            <div
              class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              @mouseenter="activeFeature = 'Tutor'"
            >
              <div class="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                <div class="ai-tutor-visual flex flex-col items-center">
                  <div class="relative mb-2">
                    <div class="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div class="typing-indicator flex space-x-1">
                    <div class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2 flex items-center">
                  <span class="icon-box bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  AI Tutor
                </h3>
                <p class="text-gray-600 mb-4">
                  24/7 personalized tutoring with adaptive explanations, instant feedback, and step-by-step problem solving.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="feature-tag bg-indigo-100 text-indigo-800">Instant Help</span>
                  <span class="feature-tag bg-indigo-100 text-indigo-800">Adaptive Learning</span>
                  <span class="feature-tag bg-indigo-100 text-indigo-800">Multisubject</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Advanced Analytics Showcase -->
       <div class="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
  <div class="md:flex">
    <!-- Left Content Panel -->
    <div class="md:w-1/2 p-10 text-white relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20 -translate-y-16 translate-x-16"></div>
      
      <h4 class="text-2xl md:text-3xl font-bold mb-4 relative z-10 animate-fade-in-up">
        Advanced Progress Analytics
      </h4>
      <p class="mb-6 text-blue-100 relative z-10 animate-fade-in-up delay-100">
        Data-driven insights into your study habits with beautiful visualizations to identify strengths and improvement areas.
        <span class="inline-block ml-2 w-4 h-0.5 bg-blue-300 rounded-full animate-pulse"></span>
      </p>
      
      <div class="mb-8 relative z-10">
        <h5 class="font-bold mb-4 text-lg animate-fade-in-up delay-150">Key Benefits</h5>
        <ul class="space-y-3">
          <li v-for="(benefit, index) in [
            'Hour tracking by subject',
            'Performance trend analysis',
            'Comparative benchmarks',
            'Custom report generation'
          ]" :key="index" class="flex items-start animate-fade-in-right" :style="`animation-delay: ${index * 0.1 + 0.2}s`">
            <div class="flex-shrink-0 mt-1 mr-3">
              <div class="w-6 h-6 rounded-full bg-green-400 bg-opacity-20 flex items-center justify-center">
                <svg class="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </div>
      
      <button class="relative z-10 bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300 group animate-fade-in-up delay-300">
        <span class="relative z-10 flex items-center">
          Try Analytics Dashboard
          <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span class="absolute inset-0 bg-yellow-300 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      </button>
    </div>
    
    <!-- Right Chart Panel -->
    <div class="md:w-1/2 bg-white p-8 flex items-center justify-center relative">
      <!-- Animated Chart Container -->
      <div class="w-full h-full bg-gray-50 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
        <!-- Animated Radar Chart -->
        <div class="relative w-full h-64">
          <!-- Radar Chart Grid -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div v-for="i in 3" :key="`circle-${i}`" 
                 class="absolute border border-gray-200 rounded-full"
                 :style="{
                   width: `${i * 30}%`,
                   height: `${i * 30}%`
                 }"></div>
          </div>
          
          <!-- Radar Chart Axes -->
          <div v-for="i in 5" :key="`axis-${i}`"
               class="absolute top-1/2 left-1/2 h-px w-1/2 bg-gray-300 origin-left"
               :style="{
                 transform: `rotate(${i * 72}deg) translateY(-50%)`
               }"></div>
          
          <!-- Animated Data Points -->
          <div v-for="(subject, index) in ['Math', 'English', 'Science', 'History', 'Geography']" 
               :key="subject"
               class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
               :style="{
                 transform: `
                   rotate(${index * 72}deg) 
                   translateY(-50%) 
                   translateX(${30 + Math.random() * 50}%)
                   rotate(-${index * 72}deg)
                 `,
                 transition: 'transform 1s ease-out',
                 transitionDelay: `${index * 0.2}s`
               }">
            <div class="w-4 h-4 bg-blue-600 rounded-full transform scale-0 animate-pop-in"
                 :style="`animation-delay: ${index * 0.2 + 0.5}s`"></div>
          </div>
          
          <!-- Animated Data Polygon -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon 
              points="50,10 70,40 90,60 75,90 25,90 10,60 30,40"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="rgba(59, 130, 246, 1)"
              stroke-width="2"
              stroke-dasharray="300"
              stroke-dashoffset="300"
              class="animate-draw"
              style="animation-delay: 0.5s"
            />
          </svg>
          
          <!-- Subject Labels -->
          <div v-for="(subject, index) in ['Math', 'English', 'Science', 'History', 'Geography']" 
               :key="`label-${index}`"
               class="absolute text-xs font-medium text-gray-600"
               :style="{
                 top: `${50 - Math.cos(index * 2 * Math.PI / 5) * 45}%`,
                 left: `${50 + Math.sin(index * 2 * Math.PI / 5) * 45}%`,
                 transform: 'translate(-50%, -50%)',
                 opacity: 0,
                 animation: 'fade-in 0.5s ease-out forwards',
                 animationDelay: `${index * 0.2 + 1}s`
               }">
            {{ subject }}
          </div>
        </div>
        
        <!-- Floating Tooltip (example) -->
        <div class="absolute top-1/3 left-1/2 bg-white shadow-lg rounded-lg p-3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div class="text-sm font-semibold text-blue-600">Math Performance</div>
          <div class="text-xs text-gray-600">Improved by 24% this month</div>
          <div class="absolute -bottom-1 left-1/2 w-3 h-3 bg-white transform -translate-x-1/2 rotate-45"></div>
        </div>
      </div>
      
      <!-- Code Snippet Overlay -->
      <div class="absolute bottom-4 left-4 bg-gray-800 text-blue-300 p-3 rounded-lg text-xs font-mono opacity-90 hidden md:block transform transition-transform duration-300 hover:scale-105">
        <div class="flex">
          <div class="text-gray-500 mr-3 select-none">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>
          <div>
            <div><span class="text-purple-400">const</span> <span class="text-blue-400">chart</span> = <span class="text-yellow-400">new</span> <span class="text-green-400">Chart</span>(ctx, {</div>
            <div class="ml-4"><span class="text-blue-400">type</span>: <span class="text-green-300">'radar'</span>,</div>
            <div class="ml-4"><span class="text-blue-400">data</span>: {</div>
            <div class="ml-8"><span class="text-blue-400">labels</span>: subjects,</div>
            <div class="ml-8"><span class="text-blue-400">datasets</span>: [{</div>
            <div class="ml-12"><span class="text-blue-400">label</span>: <span class="text-green-300">'Your Performance'</span>,</div>
            <div class="ml-12"><span class="text-blue-400">data</span>: scores,</div>
            <div class="ml-12"><span class="text-blue-400">backgroundColor</span>: <span class="text-green-300">'rgba(59, 130, 246, 0.2)'</span></div>
            <div class="ml-8">}]</div>
            <div class="ml-4">}</div>
            <div>});</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">What Students Say</h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Hear from students who improved their grades with Jibu AI</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold mr-4">
                {{ testimonial.initials }}
              </div>
              <div>
                <h5 class="font-bold">{{ testimonial.name }}</h5>
                <p class="text-sm text-blue-600">{{ testimonial.school }}</p>
              </div>
            </div>
            <p class="text-gray-700 italic mb-4">"{{ testimonial.quote }}"</p>
            <div class="flex">
              <span v-for="star in 5" :key="star" class="text-yellow-400">
                <svg class="w-5 h-5" :class="{'text-gray-300': star > testimonial.rating}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 bg-blue-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">Simple, Affordable Pricing</h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that fits your study needs</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-8 text-center">
              <h4 class="text-xl font-bold mb-2">Basic</h4>
              <p class="text-gray-600 mb-6">For casual learners</p>
              <div class="mb-6">
                <span class="text-4xl font-bold">$2.00</span>
                <span class="text-gray-500">/month</span>
              </div>
              <router-link to="/BasicPackage"><button class="w-full bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors">
                Get Started
              </button></router-link>
            </div>
            <div class="border-t border-gray-200 p-8 bg-gray-50">
              <ul class="space-y-3">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>10 paper uploads/month</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Swahili or English</span>
                </li>
                <li class="flex items-center text-gray-400">
                  <svg class="w-5 h-5 text-gray-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>No voice assistance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-xl overflow-hidden transform scale-105 border-2 border-yellow-300">
            <div class="bg-blue-700 text-white p-4 text-center">
              <span class="font-bold">MOST POPULAR</span>
            </div>
            <div class="p-8 text-center">
              <h4 class="text-xl font-bold mb-2">Premium</h4>
              <p class="text-gray-600 mb-6">For serious students</p>
              <div class="mb-6">
                <span class="text-4xl font-bold">$4.00</span>
                <span class="text-gray-500">/month</span>
              </div>
              <router-link to="/PremiumPackage">
                <button class="w-full bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors shadow-md">
                  Get Started
                </button>
              </router-link>
            </div>
            <div class="border-t border-gray-200 p-8 bg-gray-50">
              <ul class="space-y-3">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Unlimited paper uploads</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Swahili & English</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Voice assistance</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </div>
          
          
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="p-8 text-center">
                <h4 class="text-xl font-bold mb-2">School Package</h4>
                <p class="text-gray-600 mb-6">For institutions</p>
                <div class="mb-6">
                  <span class="text-4xl font-bold">$8.00</span>
                  <span class="text-gray-500">/month</span>
                </div>
                <router-link to="/school"><button class="w-full bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors">
                  Contact Sales
                </button></router-link>
              </div>
              <div class="border-t border-gray-200 p-8 bg-gray-50">
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited students</span>
                  </li>
                  <li class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Custom branding</span>
                  </li>
                  <li class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        
        <div class="mt-12 text-center">
          <p class="text-gray-600">Not sure which plan is right for you? <a href="#" class="text-blue-600 font-semibold hover:underline">Contact our team</a></p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Study Experience?</h3>
          <p class="text-xl text-blue-100 mb-8">Join thousands of Kenyan students who are studying smarter with Jibu AI</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Free 7-Day Trial
            </button>
            <button class="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-800 transition-all duration-300 hover:scale-105">
              Talk to Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to know about Jibu AI</p>
        </div>
        
        <div class="max-w-3xl mx-auto">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="mb-4 border border-gray-200 rounded-lg overflow-hidden"
          >
            <button 
              @click="toggleFAQ(index)"
              class="w-full flex justify-between items-center p-6 text-left bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <h4 class="font-bold text-lg text-gray-800">{{ faq.question }}</h4>
              <svg 
                class="w-6 h-6 text-blue-600 transition-transform duration-300"
                :class="{'transform rotate-180': activeFAQ === index}"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="activeFAQ === index"
              class="p-6 pt-0 text-gray-600"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!--Footer  -->
    <footer class="bg-blue-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <svg class="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              <h4 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">Jibu AI</h4>
            </div>

            <p class="text-blue-200 mb-4">Your AI-powered exam assistant for success. </p>
            <div class="flex space-x-4">
              <a href="#" class="text-blue-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" class="text-blue-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-blue-300 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 class="text-lg font-semibold mb-4">Product</h5>
            <ul class="space-y-2">
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="text-lg font-semibold mb-4">Company</h5>
            <ul class="space-y-2">
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">About</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="text-lg font-semibold mb-4">Support</h5>
            <ul class="space-y-2">
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Help Center</a></li>
               <router-link to="/Termsofservice">
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
            </router-link>
            <router-link to="/Privacypolicy">
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
            </router-link>
              <li><a href="#" class="text-blue-200 hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-blue-800 pt-8 text-center text-blue-300">
          <p>&copy; 2025 Jibu AI. All rights reserved. Made with ❤️ in Kenya</p>
        </div>
      </div>
    </footer> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()

console.log('Is logged in:', userStore.isAuthenticated)
console.log('User email:', userStore.userEmail)
console.log('Full user object:', userStore.user)


const router = useRouter();
if (userStore.isAuthenticated) {
  console.log('✅ User is logged in')
} else {
  console.log('🚫 User is not logged in')
}
const hoveredFeature = ref(null);
const activeFeature = ref(null);
const mobileMenuOpen = ref(false);
const activeTab = ref(0);
const activeFAQ = ref(null);

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const toggleFAQ = (index) => {
  activeFAQ.value = activeFAQ.value === index ? null : index;
};

const tabs = [
  {
    title: "Multilingual Support",
    description: "Learn in the language you're most comfortable with for better understanding.",
    features: [
      "Switch between Swahili and English instantly",
      "Cultural context included in explanations",
      "Perfect for all Kenyan students",
      "Specialized education terminology"
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Voice Assistance",
    description: "Study hands-free with our voice-enabled learning features.",
    features: [
      "Hear solutions read out loud",
      "Voice commands for navigation",
      "Perfect for audio learners",
      "Adjustable reading speed"
    ],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Smart Analytics",
    description: "Track your progress and identify areas for improvement.",
    features: [
      "Personalized performance reports",
      "Weakness identification",
      "Study recommendations",
      "Progress tracking over time"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const testimonials = [
  {
    name: "Brian Omondi",
    initials: "BO",
    school: "Alliance High School",
    quote: "Jibu AI helped me improve my Math grade from a C+ to an A- in just 3 months. The step-by-step explanations made all the difference!",
    rating: 5
  },
  {
    name: "Wanjiku Mwangi",
    initials: "WM",
    school: "Pangani Girls",
    quote: "I love that I can switch to Swahili when I don't understand a concept in English. This app understands Kenyan students!",
    rating: 4
  },
  {
    name: "James Kariuki",
    initials: "JK",
    school: "Gudka",
    quote: "The voice assistance feature is a game-changer. I can study while commuting without looking at my phone.I went from scoring 50% average on my english to scoring 90%, I just love this app",
    rating: 5
  },
  {
    name: "Grace Ombogo",
    initials: "Go",
    school: "Gudka",
    quote: "As a primary teacher handling both lower and upper grades, it has helped me teach in a simpler and more understandable way, making it easier to summarize topics and identify key concepts",
    rating: 5
  }
];

const faqs = [
  {
    question: "What subjects does Jibu AI cover?",
    answer: "Jibu AI currently covers all subjects including Mathematics, English, Kiswahili, Sciences (Physics, Chemistry, Biology), Humanities (History, Geography, CRE), and Business subjects (Business Studies, Accounting)."
  },
  {
    question: "How accurate are the solutions provided?",
    answer: "Our AI has been trained on thousands of past papers and verified by education experts. While we strive for 100% accuracy, we recommend consulting your teachers for final verification of complex problems."
  },
  {
    question: "Can I use Jibu AI without internet?",
    answer: "Currently, Jibu AI requires an internet connection to process your uploads and provide solutions. However, once solutions are generated, you can download them for offline access."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 7-day free trial for our Premium plan with no credit card required. You can cancel anytime during the trial period."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period."
  }
];
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in.delay-100 {
  animation-delay: 0.1s;
}

.animate-fade-in.delay-200 {
  animation-delay: 0.2s;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}



@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.feature-card {
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>