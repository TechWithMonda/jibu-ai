<template>
  <div class="analytics-dashboard">
    <h1>User Analytics Dashboard</h1>
    
    <!-- Loading state -->
    <div v-if="loading" class="loading">
      Loading analytics data...
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="error">
      Error loading analytics: {{ error }}
      <button @click="retryFetch" class="retry-button">Retry</button>
    </div>
    
    <!-- Main content -->
    <div v-if="!loading && !error">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <h3>Total Users</h3>
          <div class="kpi-value">{{ formatNumber(analytics.total_users) }}</div>
        </div>
        
        <div class="kpi-card">
          <h3>Today's Signups</h3>
          <div class="kpi-value">{{ formatNumber(analytics.today_signups) }}</div>
          <div class="kpi-change" :class="getChangeClass(analytics.today_signups_change)">
            {{ formatPercent(analytics.today_signups_change) }}
          </div>
        </div>
        
        <div class="kpi-card">
          <h3>This Week's Signups</h3>
          <div class="kpi-value">{{ formatNumber(analytics.week_signups) }}</div>
          <div class="kpi-change" :class="getChangeClass(analytics.week_signups_change)">
            {{ formatPercent(analytics.week_signups_change) }}
          </div>
        </div>
        
        <div class="kpi-card">
          <h3>Total Purchases</h3>
          <div class="kpi-value">{{ formatNumber(analytics.total_purchases) }}</div>
        </div>
        
        <div class="kpi-card">
          <h3>Today's Revenue</h3>
          <div class="kpi-value">{{ formatCurrency(analytics.today_revenue) }}</div>
          <div class="kpi-change" :class="getChangeClass(analytics.today_revenue_change)">
            {{ formatPercent(analytics.today_revenue_change) }}
          </div>
        </div>
      </div>
      
      <!-- Charts -->
      <div class="chart-row">
        <div class="chart-card">
          <h3>Daily Signups</h3>
          <div ref="signupsChart" class="chart"></div>
        </div>
        
        <div class="chart-card">
          <h3>Daily Purchases</h3>
          <div ref="purchasesChart" class="chart"></div>
        </div>
      </div>
      
      <div class="chart-row">
        <div class="chart-card full-width">
          <h3>Revenue Trends</h3>
          <div ref="revenueChart" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';

export default {
  name: 'AnalyticsDashboard',
  data() {
    return {
      analytics: {
        total_users: 0,
        today_signups: 0,
        today_signups_change: 0,
        week_signups: 0,
        week_signups_change: 0,
        total_purchases: 0,
        today_revenue: 0,
        today_revenue_change: 0,
        daily_signups: [],
        daily_purchases: [],
        daily_revenue: []
      },
      loading: true,
      error: null,
      charts: [],
      accessToken: '',
      refreshToken: ''
    };
  },
  async mounted() {
    await this.initializeTokens();
    await this.fetchAnalyticsData();
  },
  beforeUnmount() {
    this.destroyCharts();
  },
  methods: {
    async initializeTokens() {
      try {
        // Get tokens from secure storage
        this.accessToken = localStorage.getItem('authToken') || '';
        this.refreshToken = localStorage.getItem('refreshToken') || '';
        
        if (!this.accessToken) {
          throw new Error('No authentication token found');
        }
      } catch (error) {
        console.error('Token initialization failed:', error);
        this.handleAuthError(error);
      }
    },
    
    async fetchAnalyticsData() {
      try {
        if (!this.accessToken) {
          await this.initializeTokens();
        }

        const response = await fetch('https://web-production-d639.up.railway.app/api/user-analytics/', {
          headers: { 
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          // Token expired - try to refresh
          await this.refreshToken();
          return this.fetchAnalyticsData(); // Retry with new token
        }

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        this.analytics = await response.json();
        this.loading = false;
        this.$nextTick(this.renderCharts);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        this.handleDataError(error);
      }
    },
    
    async refreshAccessToken() {
      try {
        if (!this.refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: this.refreshToken
          })
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Refresh token expired');
          }
          throw new Error(`Token refresh failed: ${response.status}`);
        }

        const { accessToken, refreshToken } = await response.json();
        
        if (!accessToken || !refreshToken) {
          throw new Error('Invalid token response');
        }

        // Update tokens
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return accessToken;
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.clearAuthData();
        this.$router.push({ path: '/login', query: { sessionExpired: true } });
        throw error;
      }
    },
    
    clearAuthData() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    },
    
    handleAuthError(error) {
      this.error = 'Authentication failed. Please login again.';
      this.loading = false;
      this.$router.push('/login');
    },
    
    handleDataError(error) {
      this.error = error.message;
      this.loading = false;
      this.useMockData(); // Fallback to mock data
    },
    
    retryFetch() {
      this.error = null;
      this.loading = true;
      this.fetchAnalyticsData();
    },
    
    useMockData() {
      this.analytics = {
        total_users: 1245,
        today_signups: 42,
        today_signups_change: 0.15,
        week_signups: 210,
        week_signups_change: 0.23,
        total_purchases: 876,
        today_revenue: 1250.50,
        today_revenue_change: 0.08,
        daily_signups: [
          { date: '2025-07-08', count: 12 },
          { date: '2025-07-09', count: 18 },
          { date: '2025-07-10', count: 25 },
          { date: '2025-07-11', count: 32 },
          { date: '2025-07-12', count: 28 },
          { date: '2025-07-13', count: 35 },
          { date: '2025-07-14', count: 42 }
        ],
        daily_purchases: [
          { date: '2025-07-08', count: 8 },
          { date: '2025-07-09', count: 12 },
          { date: '2025-07-10', count: 15 },
          { date: '2025-07-11', count: 20 },
          { date: '2025-07-12', count: 18 },
          { date: '2025-07-13', count: 22 },
          { date: '2025-07-14', count: 25 }
        ],
        daily_revenue: [
          { date: '2025-07-08', amount: 450.75 },
          { date: '2025-07-09', amount: 620.50 },
          { date: '2025-07-10', amount: 780.25 },
          { date: '2025-07-11', amount: 920.00 },
          { date: '2025-07-12', amount: 850.50 },
          { date: '2025-07-13', amount: 1100.75 },
          { date: '2025-07-14', amount: 1250.50 }
        ]
      };
      this.loading = false;
      this.$nextTick(this.renderCharts);
    },
    
    destroyCharts() {
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
    },
    
    renderCharts() {
      this.destroyCharts();
      
      // Helper function to create chart
      const createChart = (ref, type, seriesName, data, color, yFormatter) => {
        if (!this.$refs[ref]) return;
        
        const chart = new ApexCharts(this.$refs[ref], {
          chart: { type, height: 350, zoom: { enabled: true } },
          series: [{ name: seriesName, data }],
          colors: [color],
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2 },
          xaxis: { 
            categories: this.analytics[`daily_${seriesName.toLowerCase()}`].map(item => item.date),
            labels: { rotate: -45 }
          },
          yaxis: yFormatter ? { labels: { formatter: yFormatter } } : {},
          tooltip: yFormatter ? { y: { formatter: yFormatter } } : { enabled: true }
        });
        
        chart.render();
        this.charts.push(chart);
      };
      
      createChart('signupsChart', 'line', 'Signups', 
        this.analytics.daily_signups.map(item => item.count), '#4CAF50');
      
      createChart('purchasesChart', 'line', 'Purchases', 
        this.analytics.daily_purchases.map(item => item.count), '#2196F3');
      
      createChart('revenueChart', 'area', 'Revenue', 
        this.analytics.daily_revenue.map(item => item.amount), '#FF9800', 
        value => '$' + value.toLocaleString());
    },
    
    formatNumber(num) {
      return num?.toLocaleString() || '0';
    },
    
    formatCurrency(num) {
      return '$' + (num?.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }) || '0.00');
    },
    
    formatPercent(num) {
      if (num == null) return '0%';
      return (num > 0 ? '+' : '') + (num * 100).toFixed(1) + '%';
    },
    
    getChangeClass(change) {
      return {
        'positive': change > 0,
        'negative': change < 0,
        'neutral': change === 0 || change == null
      };
    }
  }
};
</script>

<style scoped>
.analytics-dashboard {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.loading, .error {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
}

.error {
  background: #ffebee;
  color: #d32f2f;
}

.retry-button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  background: #0b7dda;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.kpi-card:hover {
  transform: translateY(-5px);
}

.kpi-value {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.kpi-change {
  font-size: 14px;
}

.kpi-change.positive {
  color: #4CAF50;
}

.kpi-change.negative {
  color: #F44336;
}

.kpi-change.neutral {
  color: #9E9E9E;
}

.chart-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-card.full-width {
  flex: 100%;
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.chart {
  min-height: 350px;
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-row {
    flex-direction: column;
  }
}
</style>