// /stores/user.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.username || user.value?.email || 'Guest')
  const userEmail = computed(() => user.value?.email || '')

  function login(userData) {
    user.value = userData

    // ✅ Store user in localStorage
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logout() {
    user.value = null

    // ✅ Clear user and token storage
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
  }

  function initFromStorage() {
    const token =
      localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (err) {
        console.error('Failed to parse stored user:', err)
        user.value = null
      }
    }
  }

  return {
    user,
    isAuthenticated,
    userName,
    userEmail,
    login,
    logout,
    initFromStorage,
  }
})
