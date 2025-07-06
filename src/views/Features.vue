<template>
    <NavBar/>
  <div class="features-view">
    <!-- Hero Section -->
    <div class="hero-section bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 px-6 rounded-xl mb-12">
      <h1 class="text-4xl font-bold mb-4">Supercharge Your Learning</h1>
      <p class="text-xl opacity-90 max-w-3xl">
        Discover 15 powerful features designed to optimize your study sessions, boost retention, 
        and maximize academic performance.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature Card 1: AI Recommendations -->
      <router-link to="aistudy">
        <div
          class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          @mouseenter="activeFeature = 'ai'"
        >
          <div class="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <div class="ai-chip animate-pulse flex items-center p-4 bg-white rounded-full shadow">
              <span class="text-2xl mr-2">🤖</span>
              <span class="font-mono text-sm">Analyzing...</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 flex items-center">
              <span class="icon-box bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">✨</span>
              AI Study Recommendations
            </h3>
            <p class="text-gray-600 mb-4">
              Get personalized schedule suggestions based on your courses, deadlines,
              and historical performance data.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="feature-tag">Smart Scheduling</span>
              <span class="feature-tag">Performance Analysis</span>
            </div>
          </div>
        </div>
      </router-link>

      <!-- Feature Card 2: Pomodoro Timer -->
      <router-link to="timer">
          <div
            class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            @mouseenter="activeFeature = 'pomodoro'"
          >
            <div class="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
              <div class="timer-circle w-32 h-32 rounded-full border-8 border-red-300 flex items-center justify-center">
                <span class="text-3xl font-mono">25:00</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 flex items-center">
                <span class="icon-box bg-red-100 text-red-600 p-2 rounded-lg mr-3">⏱️</span>
                Focus Timer
              </h3>
              <p class="text-gray-600 mb-4">
                Built-in Pomodoro timer with customizable work/break intervals and session tracking.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="feature-tag">Productivity</span>
                <span class="feature-tag">Time Management</span>
              </div>
            </div>
          </div>
      </router-link>

      <!-- Feature Card 3: Progress Tracking -->
      <router-link to="progressanalytics">
          <div
            class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            @mouseenter="activeFeature = 'progress'"
          >
            <div class="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
              <div class="chart-container w-full h-full p-4">
                <div class="chart-bar h-6 bg-teal-400 mb-2" style="width: 80%"></div>
                <div class="chart-bar h-6 bg-teal-400 mb-2" style="width: 65%"></div>
                <div class="chart-bar h-6 bg-teal-400" style="width: 90%"></div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 flex items-center">
                <span class="icon-box bg-green-100 text-green-600 p-2 rounded-lg mr-3">📈</span>
                Progress Analytics
              </h3>
              <p class="text-gray-600 mb-4">
                Visualize your study patterns with interactive charts and actionable insights.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="feature-tag">Data Visualization</span>
                <span class="feature-tag">Performance Tracking</span>
              </div>
            </div>
          </div>
      </router-link>

      <!-- Feature Card 4: Flashcards -->
      <router-link to="smartflashcards">
          <div
            class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            @mouseenter="activeFeature = 'flashcards'"
          >
            <div class="h-48 bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
              <div class="flashcard-preview w-40 h-28 bg-white rounded-lg shadow-md transform rotate-2 transition-transform duration-300 hover:rotate-0">
                <div class="card-front absolute inset-0 bg-blue-50 flex items-center justify-center p-4">
                  <span class="text-center">Photosynthesis Equation</span>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 flex items-center">
                <span class="icon-box bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">🔖</span>
                Smart Flashcards
              </h3>
              <p class="text-gray-600 mb-4">
                Spaced repetition system that adapts to your learning pace for maximum retention.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="feature-tag">Active Recall</span>
                <span class="feature-tag">Spaced Repetition</span>
              </div>
            </div>
          </div>
      </router-link>

      <!-- Feature Card 5: Resource Library -->
      <router-link to="resources">
        <div
          class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          @mouseenter="activeFeature = 'resources'"
        >
          <div class="h-48 bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
            <div class="file-stack">
              <div class="file-icon">📄</div>
              <div class="file-icon">🎥</div>
              <div class="file-icon">🔗</div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 flex items-center">
              <span class="icon-box bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">📚</span>
              Resource Library
            </h3>
            <p class="text-gray-600 mb-4">
              Organized repository for all your study materials - PDFs, videos, links, and more.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="feature-tag">Cloud Storage</span>
              <span class="feature-tag">Organization</span>
            </div>
          </div>
        </div>
      </router-link>

      <!-- Feature Card 6: Study Groups -->
      <router-link to="Aitutor">
       <div
  class="feature-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  @mouseenter="activeFeature = 'aiTutor'"
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

    <!-- Feature Spotlight (Appears on hover) -->
    <div v-if="activeFeature" class="feature-spotlight mt-12 p-8 rounded-xl bg-gray-50 border border-gray-200">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">{{ featureDetails[activeFeature].title }}</h2>
        <p class="text-lg text-gray-700 mb-6">{{ featureDetails[activeFeature].description }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold text-gray-900 mb-3">Key Benefits</h3>
            <ul class="space-y-2">
              <li v-for="benefit in featureDetails[activeFeature].benefits" :key="benefit" class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-3">How It Works</h3>
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <pre class="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">{{ featureDetails[activeFeature].codeExample }}</pre>
            </div>
          </div>
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
      activeFeature: null,
      featureDetails: {
        ai: {
          title: "AI-Powered Study Recommendations",
          description: "Our intelligent system analyzes your course load, deadlines, and performance history to generate optimal study schedules tailored just for you.",
          benefits: [
            "Saves 3+ hours weekly on planning",
            "Adapts to your learning patterns",
            "Prioritizes subjects needing attention",
            "Avoids cognitive overload"
          ],
          codeExample: `async function getRecommendations() {\n  return await aiService.analyze({\n    courses: user.courses,\n    performance: user.stats,\n    availability: user.calendar\n  });\n}`
        },
        pomodoro: {
          title: "Focus Timer with Pomodoro Technique",
          description: "Boost productivity with scientifically-proven work intervals and scheduled breaks to maintain peak cognitive performance.",
          benefits: [
            "Customizable work/break durations",
            "Session history tracking",
            "Auto-start with study sessions",
            "Focus statistics over time"
          ],
          codeExample: `function startTimer(duration) {\n  timer.value = duration;\n  interval = setInterval(() => {\n    if (timer.value <= 0) {\n      playCompletionSound();\n      startBreakTimer();\n    }\n    timer.value--;\n  }, 1000);\n}`
        },
        progress: {
          title: "Advanced Progress Analytics",
          description: "Data-driven insights into your study habits with beautiful visualizations to identify strengths and improvement areas.",
          benefits: [
            "Hour tracking by subject",
            "Performance trend analysis",
            "Comparative benchmarks",
            "Custom report generation"
          ],
          codeExample: `const chart = new Chart(ctx, {\n  type: 'radar',\n  data: {\n    labels: subjects,\n    datasets: [{\n      label: 'Your Performance',\n      data: scores,\n      backgroundColor: 'rgba(54, 162, 235, 0.2)'\n    }]\n  }\n});`
        },
        flashcards: {
          title: "Adaptive Flashcard System",
          description: "Smart flashcards that use spaced repetition algorithms to maximize long-term knowledge retention.",
          benefits: [
            "Auto-schedules review sessions",
            "Supports images/diagrams",
            "Tracks confidence levels",
            "Mobile-friendly review mode"
          ],
          codeExample: `function scheduleReview(card) {\n  const intervals = [1, 3, 7, 14, 30];\n  const days = intervals[card.confidence] || 60;\n  return new Date(Date.now() + days * 86400000);\n}`
        },
        resources: {
          title: "Unified Resource Library",
          description: "Centralized hub for all your study materials with powerful organization and search capabilities.",
          benefits: [
            "Cloud file storage",
            "PDF annotation tools",
            "Video bookmarking",
            "Cross-device sync"
          ],
          codeExample: `function uploadResource(file) {\n  const resource = {\n    id: uuid(),\n    name: file.name,\n    type: file.type,\n    subject: selectedSubject,\n    url: await storage.upload(file)\n  };\n  resources.push(resource);\n}`
        },
        collaboration: {
          title: "Collaborative Study Groups",
          description: "Real-time study sessions with classmates featuring shared tools and synchronized materials.",
          benefits: [
            "Group whiteboarding",
            "Document co-editing",
            "Shared note-taking",
            "Video/audio chat"
          ],
          codeExample: `socket.on('whiteboard-update', (paths) => {\n  whiteboard.loadPaths(paths);\n});\n\nfunction sendUpdate() {\n  socket.emit('update', whiteboard.getPaths());\n}`
        }
      }
    }
  }
}
</script>

<style scoped>
.feature-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon-box {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}


.file-stack {
  position: relative;
  width: 100px;
  height: 120px;
}

.file-icon {
  position: absolute;
  font-size: 2rem;
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.file-icon:nth-child(1) {
  top: 0;
  left: 0;
  transform: rotate(-5deg);
}

.file-icon:nth-child(2) {
  top: 20px;
  left: 20px;
  transform: rotate(3deg);
}

.file-icon:nth-child(3) {
  top: 40px;
  left: 40px;
  transform: rotate(-2deg);
}

.ai-chip {
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
}

.timer-circle {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
}

.chart-bar {
  transition: width 0.5s ease;
  border-radius: 4px;
}

.flashcard-preview {
  position: relative;
  transition: all 0.3s ease;
}

.card-front {
  backface-visibility: hidden;
}

.feature-spotlight {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>