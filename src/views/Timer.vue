<template>
    <NavBar/>
  <div class="pomodoro-container bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
    <!-- Timer Display -->
    <div class="timer-display mb-8 text-center">
      <div class="time-left text-6xl font-mono font-bold mb-4" 
           :class="{
             'text-green-600': timerMode === 'focus' && !isActive,
             'text-blue-600': timerMode === 'focus' && isActive,
             'text-amber-500': timerMode === 'short-break',
             'text-purple-600': timerMode === 'long-break'
           }">
        {{ formattedTime }}
      </div>
      <div class="timer-mode text-xl font-semibold mb-2">
        {{ modeDisplayText }}
        <span v-if="currentRound > 0" class="text-sm text-gray-500 ml-2">
          (Round {{ currentRound }} of {{ roundsBeforeLongBreak }})
        </span>
      </div>
      <div class="progress-bar-container h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div class="progress-bar h-full transition-all duration-1000 ease-linear"
             :style="{ width: progressPercentage + '%' }"
             :class="{
               'bg-blue-500': timerMode === 'focus',
               'bg-amber-400': timerMode === 'short-break',
               'bg-purple-500': timerMode === 'long-break'
             }"></div>
      </div>
    </div>

    <!-- Timer Controls -->
    <div class="timer-controls flex justify-center space-x-4 mb-8">
      <button @click="toggleTimer" 
              class="px-6 py-3 rounded-lg font-medium text-white"
              :class="{
                'bg-blue-600 hover:bg-blue-700': !isActive,
                'bg-red-600 hover:bg-red-700': isActive
              }">
        {{ isActive ? 'Pause' : 'Start' }}
      </button>
      <button @click="resetTimer" 
              class="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700">
        Reset
      </button>
      <button @click="toggleSound" 
              class="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
        {{ soundEnabled ? '🔈 Sound On' : '🔇 Sound Off' }}
      </button>
    </div>

    <!-- Timer Settings -->
    <div class="timer-settings bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="font-medium text-gray-800 mb-3">Timer Settings</h3>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Focus (mins)</label>
          <input type="number" v-model.number="focusDuration" min="1" max="60"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Short Break</label>
          <input type="number" v-model.number="shortBreakDuration" min="1" max="15"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Long Break</label>
          <input type="number" v-model.number="longBreakDuration" min="1" max="30"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
      </div>
      <div class="mt-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="autoStartNextRound" class="mr-2">
          <span class="text-sm text-gray-700">Auto-start next round</span>
        </label>
      </div>
      <div class="mt-2">
        <label class="flex items-center">
          <input type="checkbox" v-model="enableTicking" class="mr-2">
          <span class="text-sm text-gray-700">Enable ticking sound during focus</span>
        </label>
      </div>
    </div>

    <!-- Study Tips -->
    <div v-if="timerMode === 'focus' && isActive" class="study-tips bg-blue-50 p-4 rounded-lg mb-6">
      <h3 class="font-medium text-blue-800 mb-2">Focus Tip</h3>
      <p class="text-sm text-blue-700">{{ currentTip }}</p>
    </div>

    <!-- Break Suggestions -->
    <div v-if="timerMode !== 'focus' && isActive" class="break-suggestions p-4 rounded-lg mb-6"
         :class="{
           'bg-amber-50': timerMode === 'short-break',
           'bg-purple-50': timerMode === 'long-break'
         }">
      <h3 class="font-medium mb-2"
          :class="{
            'text-amber-800': timerMode === 'short-break',
            'text-purple-800': timerMode === 'long-break'
          }">
        {{ timerMode === 'short-break' ? 'Quick Break Idea' : 'Long Break Activity' }}
      </h3>
      <p class="text-sm"
         :class="{
           'text-amber-700': timerMode === 'short-break',
           'text-purple-700': timerMode === 'long-break'
         }">
        {{ breakSuggestion }}
      </p>
    </div>

    <!-- Session Stats -->
    <div class="session-stats bg-gray-50 p-4 rounded-lg">
      <h3 class="font-medium text-gray-800 mb-2">Today's Progress</h3>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold">{{ completedRoundsToday }}</div>
          <div class="text-xs text-gray-500">Focus Rounds</div>
        </div>
        <div>
          <div class="text-2xl font-bold">{{ formatTime(totalFocusTimeToday * 60) }}</div>
          <div class="text-xs text-gray-500">Focus Time</div>
        </div>
        <div>
          <div class="text-2xl font-bold">{{ completedTasksToday }}</div>
          <div class="text-xs text-gray-500">Tasks Done</div>
        </div>
      </div>
    </div>

    <!-- Task List -->
    <div class="task-list mt-6">
      <h3 class="font-medium text-gray-800 mb-3">Study Tasks</h3>
      <div class="flex mb-3">
        <input v-model="newTask" @keyup.enter="addTask" 
               placeholder="Add a task" 
               class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none">
        <button @click="addTask" 
                class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
          Add
        </button>
      </div>
      <ul class="space-y-2">
        <li v-for="(task, index) in tasks" :key="index" 
            class="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
          <input type="checkbox" v-model="task.completed" 
                 @change="completeTask(index)"
                 class="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.text }}</span>
          <button @click="removeTask(index)" 
                  class="ml-auto text-gray-400 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <!-- Audio Elements (hidden) -->
    <audio ref="focusEndSound" src="https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3" preload="auto"></audio>
    <audio ref="focusTickSound" src="https://assets.mixkit.co/sfx/preview/mixkit-clock-countdown-bleeps-916.mp3" preload="auto"></audio>
    <audio ref="breakEndSound" src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" preload="auto"></audio>
  </div>
  <Footer/>
</template>

<script>
export default {
  name: 'PomodoroTimer',
  data() {
    return {
      timerMode: 'focus',
      isActive: false,
      timeLeft: 25 * 60,
      timerInterval: null,
      lastTickTime: 0,
      tickInterval: 60,
      
      // Settings
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      roundsBeforeLongBreak: 4,
      currentRound: 0,
      autoStartNextRound: true,
      soundEnabled: true,
      enableTicking: true,
      
      // Tips and suggestions
      focusTips: [
        "Close all unrelated browser tabs",
        "Put your phone in another room",
        "Use noise-cancelling headphones",
        "Try the 5-second rule: start immediately when timer begins",
        "Focus on one task at a time"
      ],
      shortBreakSuggestions: [
        "Do some light stretching",
        "Get a glass of water",
        "Look out the window at something distant",
        "Do 10 deep breaths",
        "Walk around for a minute"
      ],
      longBreakSuggestions: [
        "Have a healthy snack",
        "Do a 5-minute meditation",
        "Take a short walk outside",
        "Listen to your favorite song",
        "Do some quick exercises"
      ],
      currentTip: '',
      breakSuggestion: '',
      
      // Task management
      tasks: [],
      newTask: '',
      
      // Stats
      completedRoundsToday: 0,
      totalFocusTimeToday: 0,
      completedTasksToday: 0,
      lastResetDate: new Date().toDateString()
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60)
      const seconds = this.timeLeft % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    modeDisplayText() {
      return {
        'focus': 'Focus Time',
        'short-break': 'Short Break',
        'long-break': 'Long Break'
      }[this.timerMode]
    },
    progressPercentage() {
      const totalDuration = {
        'focus': this.focusDuration * 60,
        'short-break': this.shortBreakDuration * 60,
        'long-break': this.longBreakDuration * 60
      }[this.timerMode]
      
      return ((totalDuration - this.timeLeft) / totalDuration) * 100
    }
  },
  created() {
    this.loadSettings()
    this.resetDailyStats()
    this.currentTip = this.getRandomTip()
    this.breakSuggestion = this.getRandomBreakSuggestion()
    this.preloadSounds()
  },
  methods: {
    startTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval)
      
      this.isActive = true
      this.timerInterval = setInterval(() => {
        this.timeLeft--
        
        // Play tick sound during focus mode at regular intervals
        if (this.timerMode === 'focus' && this.soundEnabled && this.enableTicking) {
          const currentTime = this.focusDuration * 60 - this.timeLeft;
          if (currentTime % this.tickInterval === 0 && currentTime !== 0) {
            this.playTickSound()
          }
        }
        
        if (this.timeLeft <= 0) {
          this.handleTimerCompletion()
        }
      }, 1000)
    },
    playTickSound() {
      if (!this.soundEnabled) return;
      
      try {
        this.$refs.focusTickSound.currentTime = 0;
        this.$refs.focusTickSound.play()
        this.$el.classList.add('playing-sound')
        setTimeout(() => {
          this.$el.classList.remove('playing-sound')
        }, 300)
      } catch (e) {
        console.error("Couldn't play tick sound:", e)
      }
    },
    playFocusEndSound() {
      if (!this.soundEnabled) return;
      
      try {
        this.$refs.focusEndSound.currentTime = 0;
        this.$refs.focusEndSound.play()
        this.$el.classList.add('playing-sound')
        setTimeout(() => {
          this.$el.classList.remove('playing-sound')
        }, 500)
      } catch (e) {
        console.error("Couldn't play focus end sound:", e)
      }
    },
    playBreakEndSound() {
      if (!this.soundEnabled) return;
      
      try {
        this.$refs.breakEndSound.currentTime = 0;
        this.$refs.breakEndSound.play()
        this.$el.classList.add('playing-sound')
        setTimeout(() => {
          this.$el.classList.remove('playing-sound')
        }, 500)
      } catch (e) {
        console.error("Couldn't play break end sound:", e)
      }
    },
    pauseTimer() {
      this.isActive = false
      clearInterval(this.timerInterval)
    },
    toggleTimer() {
      this.isActive ? this.pauseTimer() : this.startTimer()
    },
    resetTimer() {
      this.pauseTimer()
      this.setupCurrentMode()
    },
    toggleSound() {
      this.soundEnabled = !this.soundEnabled
      this.saveSettings()
    },
    handleTimerCompletion() {
      this.pauseTimer()
      
      if (this.timerMode === 'focus') {
        this.playFocusEndSound()
        this.completedRoundsToday++
        this.totalFocusTimeToday += this.focusDuration
        
        this.currentRound++
        if (this.currentRound >= this.roundsBeforeLongBreak) {
          this.timerMode = 'long-break'
          this.currentRound = 0
        } else {
          this.timerMode = 'short-break'
        }
      } else {
        this.playBreakEndSound()
        this.timerMode = 'focus'
      }
      
      if (this.timerMode === 'focus') {
        this.currentTip = this.getRandomTip()
      } else {
        this.breakSuggestion = this.getRandomBreakSuggestion()
      }
      
      this.setupCurrentMode()
      
      if (this.autoStartNextRound) {
        this.startTimer()
      }
    },
    setupCurrentMode() {
      this.timeLeft = {
        'focus': this.focusDuration * 60,
        'short-break': this.shortBreakDuration * 60,
        'long-break': this.longBreakDuration * 60
      }[this.timerMode]
    },
    getRandomTip() {
      return this.focusTips[Math.floor(Math.random() * this.focusTips.length)]
    },
    getRandomBreakSuggestion() {
      const suggestions = this.timerMode === 'short-break' 
        ? this.shortBreakSuggestions 
        : this.longBreakSuggestions
      return suggestions[Math.floor(Math.random() * suggestions.length)]
    },
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          text: this.newTask.trim(),
          completed: false
        })
        this.newTask = ''
        this.saveTasks()
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
      this.saveTasks()
    },
    completeTask(index) {
      if (this.tasks[index].completed) {
        this.completedTasksToday++
      }
      this.saveTasks()
    },
    resetDailyStats() {
      const today = new Date().toDateString()
      if (today !== this.lastResetDate) {
        this.completedRoundsToday = 0
        this.totalFocusTimeToday = 0
        this.completedTasksToday = 0
        this.lastResetDate = today
        this.saveSettings()
      }
    },
    preloadSounds() {
      try {
        this.$refs.focusEndSound.load()
        this.$refs.focusTickSound.load()
        this.$refs.breakEndSound.load()
      } catch (e) {
        console.error("Couldn't preload sounds:", e)
      }
    },
    loadSettings() {
      try {
        const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {}
        Object.assign(this, settings)
        
        const tasks = JSON.parse(localStorage.getItem('pomodoroTasks')) || []
        this.tasks = tasks
      } catch (e) {
        console.error("Couldn't load settings:", e)
      }
    },
    saveSettings() {
      try {
        const settings = {
          focusDuration: this.focusDuration,
          shortBreakDuration: this.shortBreakDuration,
          longBreakDuration: this.longBreakDuration,
          roundsBeforeLongBreak: this.roundsBeforeLongBreak,
          autoStartNextRound: this.autoStartNextRound,
          completedRoundsToday: this.completedRoundsToday,
          totalFocusTimeToday: this.totalFocusTimeToday,
          completedTasksToday: this.completedTasksToday,
          lastResetDate: this.lastResetDate,
          soundEnabled: this.soundEnabled,
          enableTicking: this.enableTicking
        }
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
      } catch (e) {
        console.error("Couldn't save settings:", e)
      }
    },
    saveTasks() {
      try {
        localStorage.setItem('pomodoroTasks', JSON.stringify(this.tasks))
      } catch (e) {
        console.error("Couldn't save tasks:", e)
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
  },
  watch: {
    focusDuration() {
      if (this.timerMode === 'focus') this.setupCurrentMode()
      this.saveSettings()
    },
    shortBreakDuration() {
      if (this.timerMode === 'short-break') this.setupCurrentMode()
      this.saveSettings()
    },
    longBreakDuration() {
      if (this.timerMode === 'long-break') this.setupCurrentMode()
      this.saveSettings()
    },
    roundsBeforeLongBreak() {
      this.saveSettings()
    },
    autoStartNextRound() {
      this.saveSettings()
    },
    enableTicking() {
      this.saveSettings()
    }
  }
}
</script>

<style scoped>
.pomodoro-container {
  font-family: 'Inter', sans-serif;
}

.timer-display {
  transition: all 0.3s ease;
}

.progress-bar {
  transition: width 1s linear;
}

.task-list {
  max-height: 300px;
  overflow-y: auto;
}

/* Custom scrollbar */
.task-list::-webkit-scrollbar {
  width: 6px;
}

.task-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.task-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Sound animation */
.playing-sound {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
</style>