<template>
 <NavBar/>
    <!-- Quiz Selection Screen -->
    <div v-if="!quizStarted" class="quiz-selection">
      <h1 class="text-3xl font-bold mb-8 text-blue-700">AI Quiz Challenge</h1>
      
      <div class="selection-card">
        <h2 class="text-xl mb-4">Choose a Subject</h2>
        <input 
          v-model="subject"
          placeholder="e.g. Mathematics, Biology, History"
          class="subject-input"
        />
        
        <h2 class="text-xl mb-4 mt-6">Enter Topic</h2>
        <input 
          v-model="topic"
          placeholder="e.g. Calculus, Cell Biology, World War II"
          class="topic-input"
        />
        
        <div class="mt-6">
          <h2 class="text-xl mb-4">Select Difficulty</h2>
          <div class="difficulty-buttons">
            <button
              v-for="diff in difficulties"
              :key="diff"
              @click="selectedDifficulty = diff"
              :class="{ active: selectedDifficulty === diff }"
            >
              {{ diff }}
            </button>
          </div>
        </div>
        
        <button 
          class="start-button"
          @click="startQuiz"
          :disabled="!subject || !topic || loading"
        >
          <span v-if="loading">Generating Quiz...</span>
          <span v-else>Start Quiz</span>
        </button>
      </div>
    </div>

    <!-- Quiz In Progress -->
    <div v-else-if="!quizCompleted" class="quiz-in-progress">
      <div class="quiz-header">
        <div class="quiz-info">
          <span class="topic-badge">{{ topic }}</span>
          <span class="difficulty-badge">{{ selectedDifficulty }}</span>
        </div>
        
        <div class="quiz-stats">
          <div class="stat-box">
            <span>Question</span>
            <strong>{{ currentQuestion + 1 }}/{{ questions.length }}</strong>
          </div>
          <div class="stat-box">
            <span>Score</span>
            <strong>{{ score }}</strong>
          </div>
          <div class="stat-box streak">
            <span>Streak</span>
            <strong>🔥 {{ streak }}</strong>
          </div>
        </div>
      </div>
      
      <div class="question-container">
        <h2 class="question-text">{{ currentQuestionData.question }}</h2>
        
        <div class="options-grid">
          <button
            v-for="(option, index) in currentQuestionData.options"
            :key="index"
            class="option-button"
            :class="{
              selected: selectedOption === index,
              correct: showAnswer && index === currentQuestionData.correctAnswer,
              incorrect: showAnswer && selectedOption === index && index !== currentQuestionData.correctAnswer
            }"
            @click="selectOption(index)"
            :disabled="showAnswer"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
            {{ option }}
          </button>
        </div>
        
        <button
          class="submit-button"
          @click="checkAnswer"
          :disabled="selectedOption === null"
        >
          {{ showAnswer ? (isLastQuestion ? 'See Results' : 'Next Question') : 'Submit Answer' }}
        </button>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else class="quiz-results">
      <div class="result-card">
        <div class="trophy-icon" :class="getTrophyClass()">
          🏆
        </div>
        <h1>Quiz Completed!</h1>
        <p class="score-text">You scored {{ score }}/{{ questions.length }}</p>
        
        <div class="progress-ring">
          <svg width="150" height="150">
            <circle class="progress-ring-bg" cx="75" cy="75" r="60"/>
            <circle 
              class="progress-ring-fill"
              cx="75" cy="75" r="60"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="getProgressOffset()"
            />
          </svg>
          <span class="progress-text">{{ Math.round((score/questions.length)*100) }}%</span>
        </div>
        
        <div class="reward-section">
          <div class="reward-item" v-if="streak > 2">
            <span>🔥 {{ streak }}-day streak bonus</span>
            <span>+{{ streak * 5 }} points</span>
          </div>
          <div class="reward-item">
            <span>🏆 Total score</span>
            <span>{{ score * 10 }} points</span>
          </div>
        </div>
        
        <button class="action-button" @click="resetQuiz">
          Try Another Quiz
        </button>
      </div>
    </div>
 <Footer/>
</template>

<script>
export default {
  data() {
    return {
      quizStarted: false,
      quizCompleted: false,
      loading: false,
      subject: '',
      topic: '',
      selectedDifficulty: 'medium',
      currentQuestion: 0,
      selectedOption: null,
      showAnswer: false,
      score: 0,
      streak: 0,
      difficulties: ['easy', 'medium', 'hard'],
      questions: [],
      circumference: 2 * Math.PI * 60
    }
  },
  computed: {
    currentQuestionData() {
      return this.questions[this.currentQuestion];
    },
    isLastQuestion() {
      return this.currentQuestion === this.questions.length - 1;
    }
  },
  methods: {
    async startQuiz() {
      this.loading = true;
      try {
        // Call your Django backend to generate AI questions
        const accessToken = localStorage.getItem('accessToken'); // 👈 Get it from localStorage

        const response = await fetch('https://web-production-d639.up.railway.app/api/generate-quiz/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            subject: this.subject,
            topic: this.topic,
            difficulty: this.selectedDifficulty,
            num_questions: 5
          })
        });
        
        if (!response.ok) throw new Error('Failed to generate quiz');
        
        const data = await response.json();
        this.questions = data.questions;
        this.quizStarted = true;
      } catch (error) {
        console.error('Error generating quiz:', error);
        alert('Failed to generate quiz. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    
    selectOption(index) {
      this.selectedOption = index;
    },
    
    checkAnswer() {
      if (!this.showAnswer) {
        // Submit answer
        this.showAnswer = true;
        if (this.selectedOption === this.currentQuestionData.correctAnswer) {
          this.score++;
          this.streak++;
        } else {
          this.streak = 0;
        }
      } else {
        // Move to next question or finish quiz
        if (this.isLastQuestion) {
          this.quizCompleted = true;
        } else {
          this.currentQuestion++;
          this.selectedOption = null;
          this.showAnswer = false;
        }
      }
    },
    
    getCSRFToken() {
      return document.querySelector('[name=csrfmiddlewaretoken]').value;
    },
    
    getProgressOffset() {
      const progress = 1 - (this.score / this.questions.length);
      return progress * this.circumference;
    },
    
    getTrophyClass() {
      const percentage = (this.score / this.questions.length) * 100;
      if (percentage >= 90) return 'gold';
      if (percentage >= 70) return 'silver';
      return 'bronze';
    },
    
    resetQuiz() {
      this.quizStarted = false;
      this.quizCompleted = false;
      this.currentQuestion = 0;
      this.selectedOption = null;
      this.showAnswer = false;
      this.score = 0;
      this.streak = 0;
      this.subject = '';
      this.topic = '';
    }
  }
}
</script>

<style scoped>
/* Add these new styles to your existing styles */
.subject-input, .topic-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.subject-input:focus, .topic-input:focus {
  outline: none;
  border-color: #4299e1;
}

.start-button {
  position: relative;
}

.start-button:disabled {
  opacity: 0.7;
}

/* Keep all your existing styles from before */
/* ... */
/* Selection Screen Styles */
.quiz-selection {
  text-align: center;
}

.selection-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.topic-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.topic-buttons button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.topic-buttons button.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.difficulty-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.difficulty-buttons button {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background: #e2e8f0;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
}

.difficulty-buttons button.active {
  background: #4299e1;
  color: white;
}

.start-button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.start-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.start-button:hover:not(:disabled) {
  background: #3182ce;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}

/* Quiz In Progress Styles */
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.quiz-info {
  display: flex;
  gap: 0.5rem;
}

.topic-badge, .difficulty-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
}

.topic-badge {
  background: #ebf8ff;
  color: #2b6cb0;
}

.difficulty-badge {
  background: #feebc8;
  color: #b7791f;
  text-transform: capitalize;
}

.quiz-stats {
  display: flex;
  gap: 1rem;
}

.stat-box {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-box span {
  display: block;
  font-size: 0.8rem;
  color: #718096;
}

.stat-box strong {
  font-size: 1.1rem;
}

.stat-box.streak {
  background: #fffaf0;
}

.question-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.option-button {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.option-button:hover:not(:disabled) {
  border-color: #4299e1;
  background: #ebf8ff;
}

.option-button.selected {
  border-color: #4299e1;
  background: #ebf8ff;
}

.option-button.correct {
  border-color: #48bb78;
  background: #f0fff4;
}

.option-button.incorrect {
  border-color: #f56565;
  background: #fff5f5;
}

.option-letter {
  font-weight: bold;
  margin-right: 1rem;
  color: #4299e1;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #3182ce;
}

.submit-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

/* Results Screen Styles */
.quiz-results {
  text-align: center;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.trophy-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.trophy-icon.gold {
  color: #f6ad55;
}

.trophy-icon.silver {
  color: #a0aec0;
}

.trophy-icon.bronze {
  color: #ed8936;
}

.score-text {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.progress-ring {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
}

.progress-ring-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 10;
}

.progress-ring-fill {
  fill: none;
  stroke: #4299e1;
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
}

.reward-section {
  max-width: 300px;
  margin: 0 auto 2rem;
  text-align: left;
}

.reward-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #edf2f7;
}

.action-button {
  padding: 1rem 2rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background: #3182ce;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}
</style>