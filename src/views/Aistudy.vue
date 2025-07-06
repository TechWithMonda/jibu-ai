<template>
    <NavBar/>
  <section class="study-recommendations bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4">
    <div class="container mx-auto max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            AI-Powered Study Planner
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Get personalized schedule suggestions based on your courses, deadlines, and performance data
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Study Recommendations Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div class="p-6 md:p-8">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">AI Study Recommendations</h3>
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Current Course Load</span>
                <span class="text-sm font-semibold text-blue-600">{{ courses.length }} courses</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${workloadPercentage}%` }"></div>
              </div>
            </div>

            <div class="space-y-4 mb-6">
              <div v-for="(rec, index) in recommendations" :key="index" class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <div :class="`p-1 rounded-full ${rec.priority === 'High' ? 'bg-red-100 text-red-500' : rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-green-100 text-green-500'}`">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-800">{{ rec.subject }} - {{ rec.topic }}</p>
                  <p class="text-xs text-gray-500">Recommended: {{ rec.time }} | Priority: {{ rec.priority }}</p>
                </div>
              </div>
            </div>

            <button @click="generateRecommendations" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
              <svg v-if="isGenerating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isGenerating ? 'Generating...' : 'Refresh Recommendations' }}
            </button>
          </div>
        </div>

        <!-- Performance Analysis Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div class="p-6 md:p-8">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-3 rounded-full mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Performance Analysis</h3>
            </div>

            <div class="mb-6">
              <div class="flex justify-between mb-4">
                <h4 class="text-sm font-medium text-gray-700">Subject Performance</h4>
                <select v-model="selectedTimeframe" class="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
              </div>
              
              <div class="space-y-3">
                <div v-for="subject in performanceData" :key="subject.name" class="flex items-center">
                  <div class="w-24 flex-shrink-0">
                    <span class="text-sm font-medium text-gray-700 truncate">{{ subject.name }}</span>
                  </div>
                  <div class="flex-1 mx-2">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="h-2.5 rounded-full" :class="getPerformanceColor(subject.score)" :style="{ width: `${subject.score}%` }"></div>
                    </div>
                  </div>
                  <div class="w-8 text-right">
                    <span class="text-xs font-semibold" :class="getPerformanceTextColor(subject.score)">{{ subject.score }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-xs text-blue-600 font-medium mb-1">Best Subject</p>
                <p class="text-lg font-bold text-blue-800">{{ bestSubject.name }}</p>
                <p class="text-xs text-blue-600">{{ bestSubject.score }}%</p>
              </div>
              <div class="bg-red-50 p-4 rounded-lg">
                <p class="text-xs text-red-600 font-medium mb-1">Needs Improvement</p>
                <p class="text-lg font-bold text-red-800">{{ weakSubject.name }}</p>
                <p class="text-xs text-red-600">{{ weakSubject.score }}%</p>
              </div>
            </div>

            <button @click="viewDetailedReport" class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>

      <!-- Smart Scheduling Section -->
      <div class="mt-12 bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div class="p-6 md:p-8">
          <div class="flex items-center mb-6">
            <div class="bg-blue-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800">Smart Scheduling</h3>
          </div>

          <div class="mb-6">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-sm font-medium text-gray-700">Recommended Study Plan</h4>
              <div class="flex space-x-2">
                <button @click="previousWeek" class="p-1 rounded hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <span class="text-sm font-medium text-gray-700">{{ currentWeekRange }}</span>
                <button @click="nextWeek" class="p-1 rounded hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-xs text-gray-500 border-b">
                    <th class="pb-2 text-left">Time</th>
                    <th v-for="day in days" :key="day" class="pb-2 text-center">{{ day }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="timeSlot in timeSlots" :key="timeSlot.time" class="text-sm border-b border-gray-100">
                    <td class="py-3 text-gray-500">{{ timeSlot.time }}</td>
                    <td v-for="day in days" :key="day" class="py-3 px-1 text-center">
                      <div v-if="getScheduleItem(day, timeSlot.time)" 
                        :class="`p-2 rounded-lg text-xs font-medium ${getScheduleItem(day, timeSlot.time).type === 'study' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`">
                        {{ getScheduleItem(day, timeSlot.time).subject || 'Free' }}
                      </div>
                      <div v-else class="p-2 rounded-lg text-xs text-gray-400">
                        -
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex justify-between">
            <button @click="exportSchedule" class="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export
            </button>
            <button @click="customizeSchedule" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Customize Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Sample data - replace with your actual data
const courses = ref([
  { name: 'Mathematics', code: 'MATH101', workload: 8 },
  { name: 'Physics', code: 'PHYS101', workload: 6 },
  { name: 'Chemistry', code: 'CHEM101', workload: 5 },
  { name: 'English', code: 'ENG101', workload: 4 },
]);

const recommendations = ref([
  { subject: 'Mathematics', topic: 'Calculus', time: '2 hours', priority: 'High' },
  { subject: 'Physics', topic: 'Thermodynamics', time: '1.5 hours', priority: 'Medium' },
  { subject: 'Chemistry', topic: 'Organic Chemistry', time: '1 hour', priority: 'Low' },
]);

const performanceData = ref([
  { name: 'Mathematics', score: 85 },
  { name: 'Physics', score: 72 },
  { name: 'Chemistry', score: 68 },
  { name: 'English', score: 91 },
]);

const selectedTimeframe = ref('week');
const isGenerating = ref(false);
const currentWeekOffset = ref(0);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = [
  { time: '6-8 AM' },
  { time: '8-10 AM' },
  { time: '10-12 PM' },
  { time: '12-2 PM' },
  { time: '2-4 PM' },
  { time: '4-6 PM' },
  { time: '6-8 PM' },
  { time: '8-10 PM' },
];

const schedule = ref([
  { day: 'Mon', time: '6-8 AM', subject: 'Mathematics', type: 'study' },
  { day: 'Mon', time: '8-10 AM', subject: '', type: 'free' },
  // Add more schedule items...
]);

// Computed properties
const workloadPercentage = computed(() => {
  const totalWorkload = courses.value.reduce((sum, course) => sum + course.workload, 0);
  return Math.min(100, (totalWorkload / 20) * 100); // Assuming 20 is max workload
});

const bestSubject = computed(() => {
  return [...performanceData.value].sort((a, b) => b.score - a.score)[0];
});

const weakSubject = computed(() => {
  return [...performanceData.value].sort((a, b) => a.score - b.score)[0];
});

const currentWeekRange = computed(() => {
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset.value * 7)));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
});

// Methods
function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getPerformanceColor(score) {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getPerformanceTextColor(score) {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

function getScheduleItem(day, time) {
  return schedule.value.find(item => item.day === day && item.time === time) || null;
}

function generateRecommendations() {
  isGenerating.value = true;
  // Simulate API call
  setTimeout(() => {
    // In a real app, you would update recommendations from API response
    isGenerating.value = false;
  }, 1500);
}

function viewDetailedReport() {
  // Navigate to detailed report view
  console.log('View detailed report');
}

function previousWeek() {
  currentWeekOffset.value--;
}

function nextWeek() {
  currentWeekOffset.value++;
}

function exportSchedule() {
  // Implement export functionality
  console.log('Export schedule');
}

function customizeSchedule() {
  // Navigate to schedule customization
  console.log('Customize schedule');
}

onMounted(() => {
  // Fetch initial data when component mounts
  // generateRecommendations();
});
</script>

<style scoped>
.study-recommendations {
  background-image: radial-gradient(circle at 10% 20%, rgba(219, 234, 254, 0.3) 0%, rgba(239, 246, 255, 0.3) 90%);
}

/* Custom scrollbar for schedule table */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>