<template>
  <NavBar/>
  <div class="progress-analytics">
    <h2 class="dashboard-title">Progress Analytics</h2>
    
    <!-- Time Period Selector -->
    <div class="time-controls">
      <div class="period-buttons">
        <button
          v-for="period in timePeriods"
          :key="period.value"
          @click="changePeriod(period.value)"
          :class="{ active: selectedPeriod === period.value }"
        >
          {{ period.label }}
        </button>
      </div>
      <div class="date-range">
        <span class="date-range-label">From:</span>
        <input type="date" v-model="dateRange.start" @change="updateData">
        <span class="date-range-label">To:</span>
        <input type="date" v-model="dateRange.end" @change="updateData">
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ formatTime(totalFocusTime) }}</div>
        <div class="stat-label">Total Focus</div>
        <div class="stat-change" :class="focusChange >= 0 ? 'positive' : 'negative'">
          {{ focusChange >= 0 ? '↑' : '↓' }} {{ Math.abs(focusChange) }}%
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ completedSessions }}</div>
        <div class="stat-label">Sessions</div>
        <div class="stat-change" :class="sessionsChange >= 0 ? 'positive' : 'negative'">
          {{ sessionsChange >= 0 ? '↑' : '↓' }} {{ Math.abs(sessionsChange) }}%
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ completedTasks }}</div>
        <div class="stat-label">Tasks Done</div>
        <div class="stat-change" :class="tasksChange >= 0 ? 'positive' : 'negative'">
          {{ tasksChange >= 0 ? '↑' : '↓' }} {{ Math.abs(tasksChange) }}%
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ consistencyScore }}/10</div>
        <div class="stat-label">Consistency</div>
        <div class="stat-description">{{ consistencyFeedback }}</div>
      </div>
    </div>

    <!-- Focus Time Chart -->
    <div class="chart-container">
      <h3>Daily Focus Time</h3>
      <div class="chart-wrapper">
        <svg class="line-chart" viewBox="0 0 800 300">
          <!-- X Axis -->
          <line x1="50" y1="250" x2="750" y2="250" stroke="#e5e7eb" stroke-width="1" />
          <!-- Y Axis -->
          <line x1="50" y1="50" x2="50" y2="250" stroke="#e5e7eb" stroke-width="1" />
          <!-- Grid Lines -->
          <line x1="50" y1="200" x2="750" y2="200" stroke="#f3f4f6" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="50" y1="150" x2="750" y2="150" stroke="#f3f4f6" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="50" y1="100" x2="750" y2="100" stroke="#f3f4f6" stroke-width="1" stroke-dasharray="5,5" />
          <!-- Data Line -->
          <polyline
            fill="none"
            stroke="#3b82f6"
            stroke-width="3"
            :points="focusTrendPoints"
          />
          <!-- Data Points -->
          <circle
            v-for="(point, index) in focusTrendPointsArray"
            :key="index"
            :cx="point.x"
            :cy="point.y"
            r="5"
            fill="#3b82f6"
            @mouseover="showTooltip(index)"
            @mouseout="hideTooltip"
          />
          <!-- X Axis Labels -->
          <text
            v-for="(day, index) in focusData"
            :key="'label-'+index"
            :x="50 + (index * 100)"
            y="270"
            text-anchor="middle"
            font-size="12"
            fill="#6b7280"
          >
            {{ day.label }}
          </text>
          <!-- Y Axis Labels -->
          <text x="30" y="60" text-anchor="end" font-size="12" fill="#6b7280">{{ maxFocus }}m</text>
          <text x="30" y="110" text-anchor="end" font-size="12" fill="#6b7280">{{ Math.round(maxFocus*0.66) }}m</text>
          <text x="30" y="160" text-anchor="end" font-size="12" fill="#6b7280">{{ Math.round(maxFocus*0.33) }}m</text>
          <!-- Tooltip -->
          <g v-if="tooltip.visible" :transform="`translate(${tooltip.x},${tooltip.y})`">
            <rect x="-40" y="-50" width="80" height="40" rx="4" fill="#1f2937" />
            <text x="0" y="-30" text-anchor="middle" font-size="12" fill="white">
              {{ tooltip.value }} minutes
            </text>
            <polygon points="-10,-50 10,-50 0,-40" fill="#1f2937" />
          </g>
        </svg>
      </div>
      <div class="chart-note">
        Peak: {{ peakDay }} ({{ formatTime(peakValue * 60) }})
      </div>
    </div>

    <!-- Session Distribution -->
    <div class="chart-container">
      <h3>Session Distribution</h3>
      <div class="chart-wrapper">
        <svg class="pie-chart" viewBox="0 0 400 200">
          <g transform="translate(100,100)">
            <path
              v-for="(slice, index) in pieSlices"
              :key="index"
              :d="slice.path"
              :fill="slice.color"
              stroke="#fff"
              stroke-width="1"
              @mouseover="highlightSlice(index)"
              @mouseout="unhighlightSlices"
              :style="{ opacity: highlightedSlice === null || highlightedSlice === index ? 1 : 0.5 }"
            />
          </g>
          <g transform="translate(300,50)">
            <rect
              v-for="(slice, index) in pieSlices"
              :key="'legend-'+index"
              x="0"
              :y="index * 25"
              width="20"
              height="20"
              :fill="slice.color"
            />
            <text
              v-for="(slice, index) in pieSlices"
              :key="'legendtext-'+index"
              x="30"
              :y="index * 25 + 15"
              font-size="14"
              fill="#374151"
            >
              {{ slice.label }} ({{ slice.value }})
            </text>
          </g>
        </svg>
      </div>
      <div class="chart-note">
        Average session: {{ formatTime(avgSessionLength * 60) }}
      </div>
    </div>

    <!-- Heatmap -->
    <div class="chart-container">
      <h3>Activity Heatmap</h3>
      <div class="heatmap-wrapper">
        <div class="heatmap">
          <div class="heatmap-row" v-for="(week, weekIndex) in heatmapWeeks" :key="weekIndex">
            <div
              class="heatmap-day"
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              :style="{ backgroundColor: getHeatmapColor(day.value) }"
              :title="`${day.date}: ${day.value} sessions`"
            ></div>
          </div>
        </div>
        <div class="heatmap-legend">
          <span>Less</span>
          <div class="legend-gradient"></div>
          <span>More</span>
        </div>
      </div>
      <div class="chart-note">
        Best time: {{ peakHours }} | Streak: {{ currentStreak }} days
      </div>
    </div>

    <!-- Insights -->
    <div class="insights-container">
      <h3>Personalized Insights</h3>
      <div class="insights">
        <div v-for="insight in insights" :key="insight.id" class="insight">
          <div class="insight-icon" :class="insight.type">
            {{ insight.type === 'positive' ? '✓' : '⚠' }}
          </div>
          <div class="insight-content">
            <h4>{{ insight.title }}</h4>
            <p>{{ insight.message }}</p>
            <p class="suggestion" v-if="insight.suggestion">{{ insight.suggestion }}</p>
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
      selectedPeriod: 'week',
      timePeriods: [
        { label: 'This Week', value: 'week' },
        { label: 'This Month', value: 'month' },
        { label: 'Last 3 Months', value: 'quarter' },
        { label: 'This Year', value: 'year' }
      ],
      dateRange: {
        start: this.getFormattedDate(new Date(new Date().setDate(new Date().getDate() - 7))),
        end: this.getFormattedDate(new Date())
      },
      focusData: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 90 },
        { label: 'Wed', value: 150 },
        { label: 'Thu', value: 60 },
        { label: 'Fri', value: 180 },
        { label: 'Sat', value: 30 },
        { label: 'Sun', value: 45 }
      ],
      sessionData: [
        { label: 'Morning', value: 18, color: '#3b82f6' },
        { label: 'Afternoon', value: 24, color: '#10b981' },
        { label: 'Evening', value: 12, color: '#f59e0b' },
        { label: 'Night', value: 6, color: '#8b5cf6' }
      ],
      heatmapData: this.generateHeatmapData(),
      totalFocusTime: 3560,
      focusChange: 12.5,
      completedSessions: 42,
      sessionsChange: 8,
      completedTasks: 28,
      tasksChange: -5,
      consistencyScore: 7.8,
      consistencyChange: 2.3,
      avgSessionLength: 32,
      peakHours: '10:00 AM - 12:00 PM',
      currentStreak: 5,
      tooltip: {
        visible: false,
        x: 0,
        y: 0,
        value: 0
      },
      highlightedSlice: null,
      insights: [
        {
          id: 1,
          type: 'positive',
          title: 'Morning Productivity',
          message: 'You complete 65% of your sessions before noon, showing strong morning habits.',
          suggestion: 'Schedule your most challenging tasks before lunch.'
        },
        {
          id: 2,
          type: 'warning',
          title: 'Weekend Drop-off',
          message: 'Your productivity decreases by 40% on weekends compared to weekdays.',
          suggestion: 'Try shorter but more frequent sessions on weekends.'
        },
        {
          id: 3,
          type: 'positive',
          title: 'Consistency Improving',
          message: 'Your consistency score has increased by 15% this month.',
          suggestion: 'Keep building on your current routine!'
        }
      ]
    }
  },
  computed: {
    focusTrendPoints() {
      const maxValue = Math.max(...this.focusData.map(d => d.value));
      return this.focusData.map((day, index) => {
        const x = 50 + (index * 100);
        const y = 250 - (day.value / maxValue * 200);
        return `${x},${y}`;
      }).join(' ');
    },
    focusTrendPointsArray() {
      const maxValue = Math.max(...this.focusData.map(d => d.value));
      return this.focusData.map((day, index) => {
        return {
          x: 50 + (index * 100),
          y: 250 - (day.value / maxValue * 200),
          value: day.value
        };
      });
    },
    maxFocus() {
      return Math.max(...this.focusData.map(d => d.value));
    },
    peakDay() {
      const peak = this.focusData.reduce((max, day) => day.value > max.value ? day : max);
      return peak.label;
    },
    peakValue() {
      return Math.max(...this.focusData.map(d => d.value));
    },
    pieSlices() {
      const total = this.sessionData.reduce((sum, item) => sum + item.value, 0);
      let cumulativeAngle = 0;
      const radius = 80;
      
      return this.sessionData.map(item => {
        const sliceAngle = (item.value / total) * 360;
        const startAngle = cumulativeAngle;
        cumulativeAngle += sliceAngle;
        
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (startAngle + sliceAngle - 90) * Math.PI / 180;
        
        const x1 = radius * Math.cos(startRad);
        const y1 = radius * Math.sin(startRad);
        const x2 = radius * Math.cos(endRad);
        const y2 = radius * Math.sin(endRad);
        
        const largeArcFlag = sliceAngle > 180 ? 1 : 0;
        
        const path = [
          `M 0 0`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `Z`
        ].join(' ');
        
        return {
          path,
          color: item.color,
          label: item.label,
          value: item.value,
          percentage: Math.round((item.value / total) * 100)
        };
      });
    },
    heatmapWeeks() {
      const weeks = [];
      let currentWeek = [];
      
      this.heatmapData.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === this.heatmapData.length - 1) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      });
      
      return weeks;
    },
    consistencyFeedback() {
      if (this.consistencyScore >= 9) return 'Excellent consistency! Keep it up.';
      if (this.consistencyScore >= 7) return 'Good consistency. Maintain your routine.';
      if (this.consistencyScore >= 5) return 'Moderate consistency. Look for patterns.';
      return 'Inconsistent patterns. Try a regular schedule.';
    }
  },
  methods: {
    getFormattedDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    },
    generateHeatmapData() {
      const data = [];
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 90); // 90 days of data
      
      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        data.push({
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.floor(Math.random() * 5) // Random value 0-4
        });
      }
      
      return data;
    },
    getHeatmapColor(value) {
      const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
      return colors[value] || colors[0];
    },
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
    },
    changePeriod(period) {
      this.selectedPeriod = period;
      // In a real app, you would update the date range and fetch new data here
      if (period === 'week') {
        this.dateRange.start = this.getFormattedDate(new Date(new Date().setDate(new Date().getDate() - 7)));
        this.dateRange.end = this.getFormattedDate(new Date());
      } else if (period === 'month') {
        this.dateRange.start = this.getFormattedDate(new Date(new Date().setDate(new Date().getDate() - 30)));
        this.dateRange.end = this.getFormattedDate(new Date());
      }
      this.updateData();
    },
    updateData() {
      // In a real app, you would fetch data for the selected date range here
      console.log('Fetching data for:', this.dateRange);
    },
    showTooltip(index) {
      const point = this.focusTrendPointsArray[index];
      this.tooltip = {
        visible: true,
        x: point.x,
        y: point.y - 20,
        value: point.value
      };
    },
    hideTooltip() {
      this.tooltip.visible = false;
    },
    highlightSlice(index) {
      this.highlightedSlice = index;
    },
    unhighlightSlices() {
      this.highlightedSlice = null;
    }
  }
}
</script>

<style scoped>
.progress-analytics {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #374151;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.time-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.period-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.period-buttons button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.period-buttons button:hover {
  background-color: #e5e7eb;
}

.period-buttons button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.date-range-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.date-range input {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.chart-container {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.chart-container h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.chart-wrapper {
  width: 100%;
  overflow-x: auto;
}

.line-chart {
  width: 100%;
  min-width: 700px;
  height: 300px;
}

.pie-chart {
  width: 100%;
  min-width: 400px;
  height: 200px;
}

.chart-note {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
  text-align: center;
}

.heatmap-wrapper {
  width: 100%;
  overflow-x: auto;
}

.heatmap {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}

.heatmap-row {
  display: flex;
  gap: 4px;
}

.heatmap-day {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: #ebedf0;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #6b7280;
}

.legend-gradient {
  width: 80px;
  height: 12px;
  background: linear-gradient(to right, #ebedf0, #216e39);
  border-radius: 2px;
}

.insights-container {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.insights-container h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.insights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insight {
  display: flex;
  gap: 1rem;
}

.insight-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
}

.insight-icon.positive {
  background-color: #d1fae5;
  color: #10b981;
}

.insight-icon.warning {
  background-color: #fef3c7;
  color: #f59e0b;
}

.insight-content {
  flex: 1;
}

.insight-content h4 {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.insight-content p {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.insight-content .suggestion {
  font-size: 0.75rem;
  color: #3b82f6;
  font-style: italic;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .time-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>