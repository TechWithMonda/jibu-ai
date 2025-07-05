<template>
    <NavBar/>
  <div class="flashcard-system">
    <!-- Deck Selection -->
    <div class="deck-selection" v-if="currentView === 'decks'">
      <h2 class="text-3xl font-bold mb-6">Your Flashcard Decks</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="deck in decks" 
          :key="deck.id"
          @click="selectDeck(deck)"
          class="deck-card p-6 rounded-xl shadow-md cursor-pointer transition-all hover:scale-105"
          :style="{ backgroundColor: deck.color }"
        >
          <h3 class="text-xl font-semibold mb-2">{{ deck.name }}</h3>
          <p class="text-sm opacity-80">{{ deck.cards.length }} cards</p>
          <div class="progress-bar mt-3 h-2 bg-white bg-opacity-30 rounded-full">
            <div 
              class="h-full rounded-full bg-white"
              :style="{ width: `${deck.mastery}%` }"
            ></div>
          </div>
          <p class="text-xs mt-1">Mastery: {{ deck.mastery }}%</p>
        </div>
        <div 
          @click="showCreateDeck = true"
          class="deck-card p-6 rounded-xl shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50"
        >
          <span class="text-4xl">+</span>
        </div>
      </div>
    </div>

    <!-- Create New Deck -->
    <div class="create-deck" v-if="showCreateDeck">
      <h2 class="text-2xl font-bold mb-4">Create New Deck</h2>
      <div class="space-y-4">
        <input 
          v-model="newDeck.name"
          placeholder="Deck name"
          class="w-full p-3 border rounded-lg"
        >
        <div class="color-picker">
          <p class="mb-2">Choose a color:</p>
          <div class="flex space-x-2">
            <div 
              v-for="color in deckColors"
              :key="color"
              @click="newDeck.color = color"
              class="w-8 h-8 rounded-full cursor-pointer border-2"
              :style="{ backgroundColor: color }"
              :class="{ 'border-blue-500': newDeck.color === color }"
            ></div>
          </div>
        </div>
        <div class="flex space-x-3">
          <button 
            @click="createDeck"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create Deck
          </button>
          <button 
            @click="showCreateDeck = false"
            class="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Flashcard Practice -->
    <div class="flashcard-practice" v-if="currentView === 'practice'">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ currentDeck.name }}</h2>
        <div class="flex items-center space-x-2">
          <span class="text-sm">{{ currentCardIndex + 1 }} / {{ currentDeck.cards.length }}</span>
          <button 
            @click="currentView = 'decks'"
            class="px-3 py-1 bg-gray-200 rounded-lg text-sm"
          >
            Exit
          </button>
        </div>
      </div>

      <div 
        class="flashcard-container mx-auto"
        @click="flipCard"
      >
        <div class="flashcard" :class="{ flipped: isFlipped }">
          <div class="flashcard-front">
            <div class="text-lg font-medium mb-4">Question</div>
            <div class="text-2xl">{{ currentCard.question }}</div>
            <div class="hint mt-6 text-sm text-gray-500" v-if="showHint">
              Hint: {{ currentCard.hint }}
            </div>
            <button 
              v-if="!showHint"
              @click.stop="showHint = true"
              class="mt-6 text-sm text-blue-600"
            >
              Show Hint
            </button>
          </div>
          <div class="flashcard-back">
            <div class="text-lg font-medium mb-4">Answer</div>
            <div class="text-2xl">{{ currentCard.answer }}</div>
            <div class="difficulty-buttons mt-8">
              <p class="text-sm mb-2">How well did you know this?</p>
              <div class="flex space-x-3 justify-center">
                <button 
                  v-for="(level, index) in difficultyLevels"
                  :key="index"
                  @click.stop="rateDifficulty(index)"
                  class="px-4 py-2 rounded-lg"
                  :class="[
                    'bg-' + level.color + '-100',
                    'text-' + level.color + '-800',
                    'hover:bg-' + level.color + '-200'
                  ]"
                >
                  {{ level.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Tracking -->
      <div class="progress-tracking mt-8">
        <div class="flex justify-between text-sm mb-1">
          <span>New: {{ newCards.length }}</span>
          <span>Learning: {{ learningCards.length }}</span>
          <span>Review: {{ reviewCards.length }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            class="bg-blue-600 h-2.5 rounded-full"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Deck Management -->
    <div class="deck-management" v-if="currentView === 'manage'">
      <h2 class="text-2xl font-bold mb-6">Manage Deck: {{ currentDeck.name }}</h2>
      
      <div class="flex justify-between mb-4">
        <button 
          @click="currentView = 'decks'"
          class="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Back to Decks
        </button>
        <button 
          @click="showAddCard = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add New Card
        </button>
      </div>

      <div class="card-list">
        <div 
          v-for="(card, index) in currentDeck.cards"
          :key="card.id"
          class="card-item p-4 border rounded-lg mb-3 hover:bg-gray-50"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium">Q: {{ card.question }}</p>
              <p class="text-sm text-gray-600 mt-1">A: {{ card.answer }}</p>
              <p class="text-xs text-gray-500 mt-2">
                Due: {{ formatDueDate(card.nextReview) }} | 
                Box: {{ card.box }} | 
                Repetitions: {{ card.repetitions }}
              </p>
            </div>
            <button 
              @click="editCard(index)"
              class="text-blue-600 text-sm"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Card -->
    <div class="add-card" v-if="showAddCard || editingCardIndex !== null">
      <h2 class="text-xl font-bold mb-4">
        {{ editingCardIndex !== null ? 'Edit Card' : 'Add New Card' }}
      </h2>
      <div class="space-y-4">
        <div>
          <label class="block mb-1">Question</label>
          <textarea 
            v-model="currentCardData.question"
            class="w-full p-3 border rounded-lg"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1">Answer</label>
          <textarea 
            v-model="currentCardData.answer"
            class="w-full p-3 border rounded-lg"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1">Hint (optional)</label>
          <input 
            v-model="currentCardData.hint"
            class="w-full p-3 border rounded-lg"
          >
        </div>
        <div class="flex space-x-3">
          <button 
            @click="saveCard"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
          <button 
            @click="cancelEdit"
            class="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button 
            v-if="editingCardIndex !== null"
            @click="deleteCard"
            class="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // State management
    const currentView = ref('decks')
    const showCreateDeck = ref(false)
    const showAddCard = ref(false)
    const editingCardIndex = ref(null)
    const isFlipped = ref(false)
    const showHint = ref(false)
    const currentCardIndex = ref(0)

    // Data models
    const decks = ref([])
    const currentDeck = ref(null)
    const currentCardData = ref({
      question: '',
      answer: '',
      hint: ''
    })

    // Configuration
    const deckColors = [
      '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', 
      '#B5EAD7', '#C7CEEA', '#F8B195', '#F67280'
    ]

    const difficultyLevels = [
      { label: 'Hard', color: 'red', easeFactor: 1.3 },
      { label: 'Medium', color: 'yellow', easeFactor: 2.0 },
      { label: 'Easy', color: 'green', easeFactor: 2.5 }
    ]

    // Initialize with sample data
    onMounted(() => {
      if (localStorage.getItem('flashcardDecks')) {
        decks.value = JSON.parse(localStorage.getItem('flashcardDecks'))
      } else {
        // Sample decks for demonstration
        decks.value = [
          {
            id: 1,
            name: 'French Vocabulary',
            color: '#B5EAD7',
            cards: [
              createCard('Bonjour', 'Hello', 'Common greeting'),
              createCard('Merci', 'Thank you', 'Polite expression'),
              createCard('Au revoir', 'Goodbye', 'Parting phrase')
            ]
          },
          {
            id: 2,
            name: 'Chemistry Elements',
            color: '#C7CEEA',
            cards: [
              createCard('H', 'Hydrogen', 'Lightest element'),
              createCard('O', 'Oxygen', 'Essential for breathing'),
              createCard('Na', 'Sodium', 'Highly reactive metal')
            ]
          }
        ]
        saveDecks()
      }
    })

    // Computed properties
    const currentCard = computed(() => {
      if (!currentDeck.value) return null
      return currentDeck.value.cards[currentCardIndex.value]
    })

    const newCards = computed(() => {
      if (!currentDeck.value) return []
      return currentDeck.value.cards.filter(card => card.box === 0)
    })

    const learningCards = computed(() => {
      if (!currentDeck.value) return []
      return currentDeck.value.cards.filter(card => card.box > 0 && card.box < 4)
    })

    const reviewCards = computed(() => {
      if (!currentDeck.value) return []
      return currentDeck.value.cards.filter(card => card.box >= 4)
    })

    const progressPercentage = computed(() => {
      if (!currentDeck.value || currentDeck.value.cards.length === 0) return 0
      return ((currentCardIndex.value + 1) / currentDeck.value.cards.length) * 100
    })

    // Methods
    function createCard(question, answer, hint = '') {
      return {
        id: Date.now(),
        question,
        answer,
        hint,
        box: 0, // 0 = new, 1-3 = learning, 4+ = mastered
        repetitions: 0,
        nextReview: new Date(),
        easeFactor: 2.5,
        lastReviewed: null
      }
    }

    function selectDeck(deck) {
      currentDeck.value = deck
      currentView.value = 'practice'
      currentCardIndex.value = 0
      isFlipped.value = false
      showHint.value = false
    }

    function createDeck() {
      const newDeck = {
        id: Date.now(),
        name: currentCardData.value.name,
        color: currentCardData.value.color,
        cards: [],
        mastery: 0
      }
      decks.value.push(newDeck)
      showCreateDeck.value = false
      currentCardData.value = { question: '', answer: '', hint: '' }
      saveDecks()
    }

    function flipCard() {
      isFlipped.value = !isFlipped.value
    }

    function rateDifficulty(levelIndex) {
      const card = currentCard.value
      const level = difficultyLevels[levelIndex]

      // Update card based on spaced repetition algorithm (simplified SM-2)
      if (card.box === 0) {
        // New card
        card.box = 1
        card.nextReview = addDays(new Date(), 1)
      } else {
        // Existing card
        if (levelIndex === 0) { // Hard
          card.box = Math.max(1, card.box - 1)
          card.nextReview = addDays(new Date(), 1)
        } else if (levelIndex === 1) { // Medium
          card.nextReview = addDays(new Date(), card.box * 2)
        } else { // Easy
          card.box = Math.min(6, card.box + 1)
          card.nextReview = addDays(new Date(), card.box * 4)
        }
      }

      card.repetitions++
      card.easeFactor = level.easeFactor
      card.lastReviewed = new Date()

      // Update deck mastery
      updateDeckMastery()

      // Move to next card or finish
      if (currentCardIndex.value < currentDeck.value.cards.length - 1) {
        currentCardIndex.value++
        isFlipped.value = false
        showHint.value = false
      } else {
        // All cards reviewed
        currentView.value = 'decks'
      }

      saveDecks()
    }

    function updateDeckMastery() {
      if (!currentDeck.value) return
      const masteredCards = currentDeck.value.cards.filter(card => card.box >= 4).length
      currentDeck.value.mastery = Math.round((masteredCards / currentDeck.value.cards.length) * 100)
    }

    function addDays(date, days) {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    function formatDueDate(date) {
      if (!date) return 'New'
      const today = new Date()
      const dueDate = new Date(date)
      
      if (dueDate.toDateString() === today.toDateString()) {
        return 'Today'
      }
      
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'Tomorrow'
      if (diffDays < 7) return `In ${diffDays} days`
      
      return dueDate.toLocaleDateString()
    }

    function editCard(index) {
      editingCardIndex.value = index
      currentCardData.value = { ...currentDeck.value.cards[index] }
    }

    function saveCard() {
      if (editingCardIndex.value !== null) {
        // Update existing card
        currentDeck.value.cards[editingCardIndex.value] = { 
          ...currentCardData.value,
          // Preserve spaced repetition data
          box: currentDeck.value.cards[editingCardIndex.value].box,
          repetitions: currentDeck.value.cards[editingCardIndex.value].repetitions,
          nextReview: currentDeck.value.cards[editingCardIndex.value].nextReview,
          easeFactor: currentDeck.value.cards[editingCardIndex.value].easeFactor
        }
      } else {
        // Add new card
        currentDeck.value.cards.push(createCard(
          currentCardData.value.question,
          currentCardData.value.answer,
          currentCardData.value.hint
        ))
      }
      
      cancelEdit()
      saveDecks()
      updateDeckMastery()
    }

    function deleteCard() {
      if (editingCardIndex.value !== null) {
        currentDeck.value.cards.splice(editingCardIndex.value, 1)
        cancelEdit()
        saveDecks()
        updateDeckMastery()
      }
    }

    function cancelEdit() {
      showAddCard.value = false
      editingCardIndex.value = null
      currentCardData.value = { question: '', answer: '', hint: '' }
    }

    function saveDecks() {
      localStorage.setItem('flashcardDecks', JSON.stringify(decks.value))
    }

    return {
      // State
      currentView,
      showCreateDeck,
      showAddCard,
      editingCardIndex,
      isFlipped,
      showHint,
      currentCardIndex,
      
      // Data
      decks,
      currentDeck,
      currentCardData,
      
      // Config
      deckColors,
      difficultyLevels,
      
      // Computed
      currentCard,
      newCards,
      learningCards,
      reviewCards,
      progressPercentage,
      
      // Methods
      selectDeck,
      createDeck,
      flipCard,
      rateDifficulty,
      editCard,
      saveCard,
      deleteCard,
      cancelEdit,
      formatDueDate
    }
  }
}
</script>

<style scoped>
.flashcard-system {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.deck-card {
  transition: transform 0.2s, box-shadow 0.2s;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.flashcard-container {
  perspective: 1000px;
  width: 100%;
  max-width: 600px;
  height: 400px;
  cursor: pointer;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 12px;
  text-align: center;
}

.flashcard-back {
  transform: rotateY(180deg);
}

.difficulty-buttons button {
  transition: all 0.2s;
}

/* Animations */
@keyframes cardIn {
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.flashcard {
  animation: cardIn 0.3s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flashcard-container {
    height: 300px;
  }
  
  .difficulty-buttons {
    flex-direction: column;
    gap: 8px;
  }
  
  .difficulty-buttons button {
    width: 100%;
  }
}
</style>