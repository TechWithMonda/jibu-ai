<template>
  <div class="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <svg
          class="w-12 h-12 text-blue-700"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/signup" class="font-medium text-blue-600 hover:text-blue-500">
          create a new account
        </router-link>
          <router-link to="/">
               <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-green-500">
                  Continue Without signing in
                </span>
                           </div>
             </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="emailOrUsername"
                name="emailOrUsername"
                type="emailOrUsername"
                autocomplete="username"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  :class="{ 'text-blue-500': showPassword }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              :class="{
                'bg-blue-600 hover:bg-blue-700': !isLoading,
                'bg-gray-400 cursor-not-allowed': isLoading,
              }"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <span v-if="!isLoading">Sign in</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            </button>
            <div v-if="errorMessage" class="mb-4 text-sm text-red-600 text-center">
    {{ errorMessage }}
  </div>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Or continue with </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                @click="loginWithGoogle"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
              </button>
            </div>

            <div>
              <button
                @click="loginWithMicrosoft"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 23 23"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 11.5H1V1h10.5v10.5zm0 10.5H1V12h10.5v10zM23 11.5H12.5V1H23v10.5zm0 10.5H12.5V12H23v10z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const emailOrUsername = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const handleLogin = async () => {
  if (!emailOrUsername.value || !password.value) {
  errorMessage.value = 'Please enter both username/email and password'
  return
}


  isLoading.value = true
  errorMessage.value = ''

  try {
   const response = await axios.post('https://9ccd-154-159-238-97.ngrok-free.app/api/login/', {
  username: emailOrUsername.value,
  password: password.value,
 
})

const data = response.data
console.log('Login response:', data) // ✅ Safe now




    const { access, refresh, user } = response.data
console.log('User received:', user)
    // Store tokens
    localStorage.setItem('access_token', access)
    if (rememberMe.value) {
      localStorage.setItem('refresh_token', refresh)
    } else {
      sessionStorage.setItem('refresh_token', refresh)
    }

    // Set default auth header
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

    // Update user store
    userStore.login(user)

    // Show success message
    toast.success('Login successful!')

    // Redirect to dashboard or intended rou
    const redirectPath = router.currentRoute.value.query.redirect || '/'
    router.push(redirectPath)

  } catch (error) {
    console.error('Login error:', error)
    
    if (error.response) {
      // Handle Django backend errors
      const { data } = error.response
      if (data.detail) {
        errorMessage.value = data.detail
      } else if (data.email) {
        errorMessage.value = data.email[0]
      } else if (data.password) {
        errorMessage.value = data.password[0]
      } else {
        errorMessage.value = 'Login failed. Please try again.'
      }
    } else {
      errorMessage.value = 'Network error. Please check your connection.'
    }
    
    toast.error(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    // Redirect to Django's Google OAuth URL
    window.location.href = '/api/auth/google/login/'
  } catch (error) {
    toast.error('Failed to initiate Google login')
    console.error('Google login error:', error)
  }
}

const loginWithMicrosoft = async () => {
  try {
    // Redirect to Django's Microsoft OAuth URL
    window.location.href = '/api/auth/microsoft/login/'
  } catch (error) {
    toast.error('Failed to initiate Microsoft login')
    console.error('Microsoft login error:', error)
  }
}
</script>


<style scoped>
/* Add any custom styles here */
</style>
