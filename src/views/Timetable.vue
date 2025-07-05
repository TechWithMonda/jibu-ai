<template>
  <div class="bg-gray-50 min-h-screen">
    <NavBar />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Timetable Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Study Timetable</h2>
          <button 
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Schedule
          </button>
        </div>

        <!-- Week Navigation -->
        <div class="flex justify-between items-center mb-6">
          <button @click="previousWeek" class="p-2 rounded-full hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h3 class="text-lg font-medium text-gray-800">{{ weekRange }}</h3>
          <button @click="nextWeek" class="p-2 rounded-full hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Timetable Grid -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th class="w-24 p-3 text-left text-sm font-medium text-gray-500">Time</th>
                <th v-for="day in days" :key="day" class="p-3 text-center text-sm font-medium text-gray-500">
                  {{ day }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="timeSlot in timeSlots" :key="timeSlot">
                <td class="p-3 text-sm text-gray-500">{{ timeSlot }}</td>
                <td 
                  v-for="day in days" 
                  :key="`${day}-${timeSlot}`"
                  class="p-3 border border-gray-100 min-w-40 h-20"
                  @click="openAddModal(day, timeSlot)"
                >
                  <div 
                    v-for="(schedule, index) in getSchedulesForSlot(day, timeSlot)"
                    :key="index"
                    class="p-2 mb-1 rounded bg-blue-50 border border-blue-100 text-sm text-blue-800 cursor-pointer hover:bg-blue-100"
                    @click.stop="openEditModal(schedule)"
                  >
                    <div class="font-medium">{{ schedule.subject }}</div>
                    <div class="text-xs">{{ schedule.reminder ? '🔔 Reminder set' : '' }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Upcoming Reminders -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Upcoming Reminders</h2>
        <div v-if="upcomingReminders.length > 0" class="space-y-3">
          <div 
            v-for="reminder in upcomingReminders"
            :key="reminder.id"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">{{ reminder.subject }}</h3>
                <p class="text-sm text-gray-600 mt-1">
                  {{ formatDate(reminder.date) }} at {{ reminder.time }}
                </p>
                <p class="text-sm text-gray-500 mt-1">{{ reminder.notes }}</p>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="cancelReminder(reminder.id)"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          No upcoming reminders
        </div>
      </div>

      <!-- Add/Edit Schedule Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-800">
              {{ editingSchedule ? 'Edit Schedule' : 'Add New Schedule' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                v-model="newSchedule.subject"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Mathematics, Biology"
              >
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <select
                  v-model="newSchedule.day"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option v-for="day in days" :value="day" :key="day">{{ day }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  v-model="newSchedule.time"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option v-for="time in timeSlots" :value="time" :key="time">{{ time }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                v-model="newSchedule.notes"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Additional notes..."
              ></textarea>
            </div>

            <div class="flex items-center">
              <input
                v-model="newSchedule.reminder"
                id="reminder-checkbox"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="reminder-checkbox" class="ml-2 block text-sm text-gray-700">
                Set reminder 15 minutes before
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="saveSchedule"
                class="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                {{ editingSchedule ? 'Update' : 'Save' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // Days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    // Time slots (every hour from 8am to 8pm)
    const timeSlots = Array.from({ length: 13 }, (_, i) => {
      const hour = i + 8
      return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
    })

    // Current week tracking
    const currentWeekStart = ref(new Date())
    currentWeekStart.value.setHours(0, 0, 0, 0)
    // Set to previous Monday
    while (currentWeekStart.value.getDay() !== 1) {
      currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 1)
    }

    // Week range display
    const weekRange = computed(() => {
      const start = new Date(currentWeekStart.value)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    })

    // Navigation between weeks
    const previousWeek = () => {
      const date = new Date(currentWeekStart.value)
      date.setDate(date.getDate() - 7)
      currentWeekStart.value = date
    }

    const nextWeek = () => {
      const date = new Date(currentWeekStart.value)
      date.setDate(date.getDate() + 7)
      currentWeekStart.value = date
    }

    // Schedules data
    const schedules = ref([])
    const showAddModal = ref(false)
    const editingSchedule = ref(null)
    
    const newSchedule = ref({
      id: null,
      subject: '',
      day: 'Monday',
      time: '8:00 AM',
      notes: '',
      reminder: false,
      date: null
    })

    // Open modal for adding new schedule
    const openAddModal = (day, time) => {
      newSchedule.value = {
        id: null,
        subject: '',
        day: day,
        time: time,
        notes: '',
        reminder: false,
        date: null
      }
      editingSchedule.value = null
      showAddModal.value = true
    }

    // Open modal for editing existing schedule
    const openEditModal = (schedule) => {
      newSchedule.value = { ...schedule }
      editingSchedule.value = schedule.id
      showAddModal.value = true
    }

    // Close modal
    const closeModal = () => {
      showAddModal.value = false
    }

    // Save schedule
    const saveSchedule = () => {
      if (!newSchedule.value.subject) {
        alert('Please enter a subject')
        return
      }

      // Calculate the actual date for this schedule
      const dayIndex = days.indexOf(newSchedule.value.day)
      const scheduleDate = new Date(currentWeekStart.value)
      scheduleDate.setDate(scheduleDate.getDate() + dayIndex)
      newSchedule.value.date = scheduleDate.toISOString()

      if (editingSchedule.value) {
        // Update existing schedule
        const index = schedules.value.findIndex(s => s.id === editingSchedule.value)
        if (index >= 0) {
          schedules.value[index] = { ...newSchedule.value }
        }
      } else {
        // Add new schedule
        newSchedule.value.id = Date.now()
        schedules.value.push({ ...newSchedule.value })
      }

      // Set reminder if enabled
      if (newSchedule.value.reminder) {
        setReminder(newSchedule.value)
      }

      // Save to localStorage
      localStorage.setItem('studySchedules', JSON.stringify(schedules.value))
      closeModal()
    }

    // Delete schedule
    const deleteSchedule = (id) => {
      schedules.value = schedules.value.filter(schedule => schedule.id !== id)
      localStorage.setItem('studySchedules', JSON.stringify(schedules.value))
    }

    // Get schedules for a specific time slot
    const getSchedulesForSlot = (day, time) => {
      return schedules.value.filter(
        schedule => schedule.day === day && schedule.time === time
      )
    }

    // Upcoming reminders
    const upcomingReminders = computed(() => {
      const now = new Date()
      return schedules.value
        .filter(schedule => schedule.reminder)
        .filter(schedule => {
          const reminderTime = new Date(schedule.date)
          const [hours, minutes] = schedule.time.split(':')
          const period = schedule.time.includes('PM') && hours !== '12' ? 12 : 0
          reminderTime.setHours(
            parseInt(hours) + period,
            parseInt(minutes),
            0, 0
          )
          // Set reminder 15 minutes before
          reminderTime.setMinutes(reminderTime.getMinutes() - 15)
          return reminderTime > now
        })
        .sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA - dateB
        })
    })

    // Cancel reminder
    const cancelReminder = (id) => {
      const index = schedules.value.findIndex(s => s.id === id)
      if (index >= 0) {
        schedules.value[index].reminder = false
        localStorage.setItem('studySchedules', JSON.stringify(schedules.value))
      }
    }

    // Set browser notification reminder
    const setReminder = (schedule) => {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notifications')
        return
      }

      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            createReminderNotification(schedule)
          }
        })
      } else {
        createReminderNotification(schedule)
      }
    }

    const createReminderNotification = (schedule) => {
      const reminderTime = new Date(schedule.date)
      const [hours, minutes] = schedule.time.split(':')
      const period = schedule.time.includes('PM') && hours !== '12' ? 12 : 0
      reminderTime.setHours(
        parseInt(hours) + period,
        parseInt(minutes),
        0, 0
      )
      // Set reminder 15 minutes before
      reminderTime.setMinutes(reminderTime.getMinutes() - 15)

      const now = new Date()
      const timeout = reminderTime - now

      if (timeout > 0) {
        setTimeout(() => {
          new Notification('Study Reminder', {
            body: `Time to study ${schedule.subject} in 15 minutes!`,
            icon: '/favicon.ico'
          })
        }, timeout)
      }
    }

    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric'
      })
    }

    // Load schedules from localStorage
    onMounted(() => {
      const storedSchedules = localStorage.getItem('studySchedules')
      if (storedSchedules) {
        schedules.value = JSON.parse(storedSchedules)
      }

      // Request notification permission on load
      if ('Notification' in window) {
        Notification.requestPermission()
      }
    })

    return {
      days,
      timeSlots,
      currentWeekStart,
      weekRange,
      previousWeek,
      nextWeek,
      schedules,
      showAddModal,
      editingSchedule,
      newSchedule,
      upcomingReminders,
      openAddModal,
      openEditModal,
      closeModal,
      saveSchedule,
      deleteSchedule,
      getSchedulesForSlot,
      cancelReminder,
      formatDate
    }
  }
}
</script>

<style scoped>
/* Custom styles for timetable */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  border: 1px solid #e5e7eb;
}

th {
  background-color: #f9fafb;
}

/* Hover effects */
tr:hover td {
  background-color: #f8fafc;
}

/* Transition effects */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Empty state styling */
.text-gray-500 {
  color: #6b7280;
}
</style>