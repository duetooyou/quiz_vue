import { createRouter, createWebHistory } from 'vue-router'
import Quizzes from "../components/Quizzes.vue";
import Quiz from "../components/Quiz.vue";
import Auth from "../components/Auth.vue";
import Register from "../components/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'registration',
      component: Register
    },
    {
      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/quizzes/',
      name: 'home',
      component: Quizzes
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: Quiz
    }
  ]
})

export default router
