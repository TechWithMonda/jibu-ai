<template>
  <div class="bg-gray-50 min-h-screen">
    <NavBar />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Main Dashboard Content -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- Dashboard Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p class="text-gray-600">Welcome back! Here's your overview</p>
          </div>
          <router-link to="uploadpaper">
            <button
              @click="activeTab = 'upload'"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Upload Paper
            </button>
          </router-link>
          <router-link to="notes">
            <button
              @click="activeTab = 'notes'"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
             My Notes
            </button>
          </router-link>
             <router-link to="timetable">
            <button
              @click="activeTab = 'notes'"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
             My TimeTable
            </button>
          </router-link>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-blue-600">Total Papers</p>
                <h3 class="text-2xl font-bold mt-1">24</h3>
              </div>
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-lg p-6 border border-green-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-green-600">Solutions Viewed</p>
                <h3 class="text-2xl font-bold mt-1">187</h3>
              </div>
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-purple-600">Accuracy Rate</p>
                <h3 class="text-2xl font-bold mt-1">92%</h3>
              </div>
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 rounded-lg p-6 border border-amber-100">
            <div class="flex justify-between">
              <div>
                <p class="text-sm text-amber-600">Time Saved</p>
                <h3 class="text-2xl font-bold mt-1">42h</h3>
              </div>
              <div class="bg-amber-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Papers Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Recent Papers</h2>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="paper in recentPapers" 
              :key="paper.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div class="flex items-start">
                <div class="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ paper.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ paper.subject }} • {{ paper.date }}</p>
                  <div class="flex mt-3 space-x-2">
                    <button class="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-medium">
                      View
                    </button>
                    <button class="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Feed -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="flex items-start p-4 border border-gray-200 rounded-lg"
            >
              <div :class="`bg-${activity.color}-100 p-2 rounded-lg mr-4`">
                <svg class="w-5 h-5" :class="`text-${activity.color}-600`" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path :d="activity.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ activity.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('dashboard')

const recentPapers = ref([
  {
    id: 1,
    name: 'KCSE 2022 Mathematics Paper 1',
    subject: 'Mathematics',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'KCPE 2021 Science',
    subject: 'Science',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'KCSE 2020 Biology Paper 2',
    subject: 'Biology',
    date: '2 weeks ago'
  }
])

const recentActivities = ref([
  {
    id: 1,
    title: 'New solutions generated',
    description: 'KCSE 2022 Mathematics Paper 1',
    time: '5 minutes ago',
    color: 'blue',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    id: 2,
    title: 'Accuracy verified',
    description: 'You confirmed 5 solutions were correct',
    time: '30 minutes ago',
    color: 'green',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    id: 3,
    title: 'Paper uploaded',
    description: 'KCPE 2021 Science paper scanned',
    time: '2 hours ago',
    color: 'purple',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
  }
])
</script>

<style scoped>
/* Smooth transitions for hover effects */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>