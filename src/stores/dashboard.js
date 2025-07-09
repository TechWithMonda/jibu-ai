// stores/dashboard.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/axios'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const stats = ref({
    solutions_viewed: 0,
    accuracy_rate: 0,
    time_saved: 0
  })
  
  const recentPapers = ref([])
  const recentActivities = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const fetchDashboardData = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await api.get('/dashboard')
      
      // Validate and set data
      if (response.data) {
        stats.value = {
          total_papers: response.data.stats?.total_papers || 0,
          solutions_viewed: response.data.stats?.solutions_viewed || 0,
          accuracy_rate: response.data.stats?.accuracy_rate || 0,
          time_saved: response.data.stats?.time_saved || 0
        }
        
        recentPapers.value = Array.isArray(response.data.recentPapers) 
          ? response.data.recentPapers 
          : []
          
        recentActivities.value = Array.isArray(response.data.recentActivities) 
          ? response.data.recentActivities 
          : []
      }
    } catch (err) {
      error.value = err.response?.data?.message || 
                   err.message || 
                   'Failed to fetch dashboard data'
      console.error('Dashboard store error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const formattedStats = computed(() => ({
    totalPapers: stats.value.total_papers,
    solutionsViewed: stats.value.solutions_viewed,
    accuracyRate: `${Math.round(stats.value.accuracy_rate * 100)}%`,
    timeSaved: `${stats.value.time_saved}h`
  }))

  const hasData = computed(() => {
    return recentPapers.value.length > 0 || recentActivities.value.length > 0
  })

  return {
    // State
    stats,
    recentPapers,
    recentActivities,
    isLoading,
    error,
    
    // Actions
    fetchDashboardData,
    
    // Computed
    formattedStats,
    hasData
  }
})