import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './plugins/chart'
import { useUserStore } from '@/stores/user' // chart.js setup (keep if needed)

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// ✅ Create app and Pinia
const app = createApp(App)
app.use(Toast, {
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
})
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ✅ Register global components
app.component('NavBar', NavBar)
app.component('Footer', Footer)

const userStore = useUserStore()
userStore.initFromStorage()

// ✅ Use plugins

// ✅ Mount app
app.mount('#app')
