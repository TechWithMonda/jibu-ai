<template>
  <div class="bg-gray-50 min-h-screen">
    <NavBar />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Notes Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">My Notes</h2>
          <div class="flex space-x-3">
            <button 
              @click="saveNote"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              Save Note
            </button>
            <button 
              @click="downloadNote"
              :disabled="!currentNote.content"
              :class="{'bg-green-600 hover:bg-green-700': currentNote.content, 'bg-gray-400 cursor-not-allowed': !currentNote.content}"
              class="text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </button>
          </div>
        </div>

        <!-- Note Title -->
        <div class="mb-4">
          <input
            v-model="currentNote.title"
            placeholder="Note Title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
          >
        </div>

        <!-- Note Editor -->
        <div class="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <textarea
            v-model="currentNote.content"
            placeholder="Write your notes here..."
            class="w-full h-64 p-4 focus:outline-none resize-none"
          ></textarea>
        </div>

        <!-- Saved Notes List -->
        <div class="mt-8" v-if="savedNotes.length > 0">
          <h3 class="text-lg font-medium text-gray-800 mb-4">Saved Notes</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="(note, index) in savedNotes" 
              :key="index"
              class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
              @click="loadNote(index)"
            >
              <h4 class="font-medium text-gray-900 truncate">{{ note.title || 'Untitled Note' }}</h4>
              <p class="text-sm text-gray-500 mt-1">{{ formatDate(note.createdAt) }}</p>
              <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ note.content }}</p>
              <div class="flex justify-end mt-3 space-x-2">
                <button 
                  @click.stop="deleteNote(index)"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No notes yet</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by writing your first note above</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    // Notes functionality
    const currentNote = ref({
      title: '',
      content: '',
      createdAt: null
    })

    const savedNotes = ref([])

    const saveNote = () => {
      if (!currentNote.value.content.trim()) {
        alert('Please write some content before saving')
        return
      }
      
      // Add timestamp if new note
      if (!currentNote.value.createdAt) {
        currentNote.value.createdAt = new Date().toISOString()
      }
      
      // Check if this is an existing note being updated
      const existingIndex = savedNotes.value.findIndex(
        note => note.createdAt === currentNote.value.createdAt
      )
      
      if (existingIndex >= 0) {
        // Update existing note
        savedNotes.value[existingIndex] = { ...currentNote.value }
      } else {
        // Add new note
        savedNotes.value.unshift({ ...currentNote.value })
      }
      
      // Reset current note
      currentNote.value = {
        title: '',
        content: '',
        createdAt: null
      }
      
      // Save to localStorage
      localStorage.setItem('userNotes', JSON.stringify(savedNotes.value))
    }

    const loadNote = (index) => {
      currentNote.value = { ...savedNotes.value[index] }
    }

    const deleteNote = (index) => {
      if (confirm('Are you sure you want to delete this note?')) {
        savedNotes.value.splice(index, 1)
        localStorage.setItem('userNotes', JSON.stringify(savedNotes.value))
        
        // Clear current note if it's the one being deleted
        if (currentNote.value.createdAt === savedNotes.value[index]?.createdAt) {
          currentNote.value = {
            title: '',
            content: '',
            createdAt: null
          }
        }
      }
    }

    const downloadNote = () => {
      if (!currentNote.value.content.trim()) {
        alert('Please write some content before downloading')
        return
      }
      
      const title = currentNote.value.title || 'My Note'
      const content = currentNote.value.content
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt` // Sanitize filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Load saved notes on component mount
    onMounted(() => {
      const storedNotes = localStorage.getItem('userNotes')
      if (storedNotes) {
        savedNotes.value = JSON.parse(storedNotes)
      }
    })

    return {
      currentNote,
      savedNotes,
      saveNote,
      loadNote,
      deleteNote,
      downloadNote,
      formatDate
    }
  }
}
</script>

<style scoped>
/* Custom styles for notes section */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for hover effects */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Style for disabled download button */
button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>