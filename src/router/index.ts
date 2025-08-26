import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../views/ResultsView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protection des routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router