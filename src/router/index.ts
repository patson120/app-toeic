
import { createRouter, createWebHistory } from 'vue-router'
import ResultsView from '../views/ResultsView.vue'
import TestView from '../views/TestView.vue'


import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protection des routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log(to, from, authStore);
  
  //if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //  next('/login')
  //} else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
  //  next('/dashboard')
  //} else {
  //  next()
  //}
  next()
})

export default router