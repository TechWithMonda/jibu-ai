<template>
  <header
    class="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-opacity-90"
  >
    <div class="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20">
          <svg
            class="w-6 h-6 text-blue-100"
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
        <router-link to="/" class="focus:outline-none">
          <h1
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white hover:text-white transition-colors duration-300"
          >
            Jibu AI
          </h1>
        </router-link>
      </div>

      <nav class="hidden md:flex items-center space-x-1">
        <router-link 
          v-for="link in navLinks" 
          :key="link.to"
          :to="link.to"
          class="px-3 py-2 text-sm rounded-lg text-blue-50 hover:bg-blue-500/30 transition-colors duration-200"
          active-class="bg-blue-500/30 font-medium"
        >
          {{ link.text }}
        </router-link>
      </nav>

      <div class="flex items-center space-x-3">
        <template v-if="isAuthenticated">
          <div class="hidden md:flex items-center space-x-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/30 text-blue-100 text-sm font-medium">
              {{ userInitial }}
            </div>
            <span class="text-blue-50 text-sm">
              {{ userName }}
            </span>
          </div>
          <button
            @click="handleLogout"
            class="hidden md:block px-3 py-1.5 text-sm rounded-lg bg-white/0 border border-blue-300/50 text-blue-50 hover:bg-blue-500/30 hover:border-blue-400/70 transition-all duration-200 hover:shadow-sm"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <router-link to="/login">
            <button
              class="hidden md:block px-3 py-1.5 text-sm rounded-lg bg-white/0 border border-blue-300/50 text-blue-50 hover:bg-blue-500/30 hover:border-blue-400/70 transition-all duration-200 hover:shadow-sm"
            >
              Login
            </button>
          </router-link>
          <router-link to="/signup">
            <button
              class="px-3 py-1.5 text-sm rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              Sign Up Free
            </button>
          </router-link>
        </template>

        <button
          @click="toggleMobileMenu"
          class="md:hidden p-1.5 rounded-lg hover:bg-blue-500/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden bg-blue-700/95 backdrop-blur-sm px-4 py-3 border-t border-blue-600/50"
      >
        <div class="flex flex-col space-y-2">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-blue-50"
            active-class="bg-blue-600 font-medium"
            @click="toggleMobileMenu"
          >
            {{ link.text }}
          </router-link>

          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-3 px-3 py-2">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/30 text-blue-100 text-sm font-medium">
                {{ userInitial }}
              </div>
              <span class="text-blue-50 text-sm">
                {{ userName }}
              </span>
            </div>
            <button
              @click="handleLogout"
              class="w-full px-3 py-2 text-left rounded-lg hover:bg-blue-600 transition-colors duration-200 text-blue-50"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/login">
              <button
                class="w-full px-3 py-2 text-left rounded-lg hover:bg-blue-600 transition-colors duration-200 text-blue-50"
                @click="toggleMobileMenu"
              >
                Login
              </button>
            </router-link>
            <router-link to="/signup">
              <button
                class="w-full mt-2 px-3 py-2 text-center rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-200"
                @click="toggleMobileMenu"
              >
                Sign Up Free
              </button>
            </router-link>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed } from "vue"
import { useUserStore } from "@/stores/user"
import { useRouter } from "vue-router"

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/dashboard", text: "Dashboard" },
  { to: "/uploadpaper", text: "Upload Paper" },
  { to: "/features", text: "Features" },
  { to: "/notes", text: "My Notes" },
  { to: "/timetable", text: "TimeTable" }
]

const userStore = useUserStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const isAuthenticated = computed(() => userStore.isAuthenticated)
const userName = computed(
  () => userStore.user?.username || userStore.user?.email || "Guest"
)
const userInitial = computed(() => {
  const name = userName.value
  return name ? name.charAt(0).toUpperCase() : 'G'
})

const handleLogout = () => {
  userStore.logout()
  mobileMenuOpen.value = false
  router.push("/login")
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>