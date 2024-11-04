import { createRouter, createWebHistory } from "vue-router";
import HomePage from "/src/components/HomePage.vue";
import LoginPage from "/src/components/LoginPage.vue";
import RegisterPage from "/src/components/RegisterPage.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // Correction ici
  routes,
});

export default router;
