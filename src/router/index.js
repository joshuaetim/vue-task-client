import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/AboutView.vue'
import Home from '../views/HomeView.vue'
import Quiz from '../views/QuizView.vue'
import UploadQuiz from '../views/UploadQuiz.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz/:sessionID',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadQuiz
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
