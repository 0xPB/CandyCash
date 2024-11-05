import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '/src/components/HomePage.vue';
import LoginPage from '/src/components/LoginPage.vue';
import RegisterPage from '/src/components/RegisterPage.vue';
import ProfilePage from '/src/components/ProfilePage.vue';
import StatisticsPage from '/src/components/StatisticsPage.vue';  // Importer la page des statistiques

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/statistics', name: 'Statistics', component: StatisticsPage }, // Route vers la page des statistiques
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
