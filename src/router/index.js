import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../views/Notes.vue')
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('../views/Timetable.vue')
    },
    {
      path: '/progressanalytics',
      name: 'progressanalytics',
      component: () => import('../views/Progressanalytics.vue')
    },
    {
      path: '/smartflashcards',
      name: 'smartflashcards',
      component: () => import('../views/Smartflashcards.vue')
    },
    {
      path: '/features',
      name: 'features',
      component: () => import('../views/Features.vue')
    },
    {
      path: '/aistudy',
      name: 'aistudy',
      component: () => import('../views/Aistudy.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/Resource.vue')
    },
    {
      path: '/tutor',
      name: 'Aitutor',
      component: () => import('../views/Tutor.vue')
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import('../views/Timer.vue')
    },
    {
      path: '/uploadpaper',
      name: 'uploadpaper',
      component: () => import('../views/Uploadpaper.vue')
    }
  ]
})

export default router