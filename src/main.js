import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './plugins/chart'; // Import the char

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('NavBar',NavBar)
app.component('Footer', Footer)

app.use(createPinia())
app.use(router)

app.mount('#app')
