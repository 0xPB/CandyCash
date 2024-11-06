// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/components/LoginPage.vue';
import RegisterPage from '/src/components/RegisterPage.vue';
import ProfilePage from '/src/components/ProfilePage.vue';
import StatisticsPage from '/src/components/StatisticsPage.vue';

const routes = [
  //{ path: '/', name: 'Home', component: ProfilePage }, // redirige vers ProfilePage par défaut
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/statistics', name: 'Statistics', component: StatisticsPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
