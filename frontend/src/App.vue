<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore(); // Accès au store
const router = useRouter();

// Vérifie l'état de connexion au chargement
authStore.checkLogin();

function handleLogout() {
  authStore.logout();
  router.push('/login'); // Redirige vers la page de connexion
}
</script>

<template>
  <header>
    <h1>CandyCash</h1>
    <nav>
      <!-- Affichage dynamique en fonction de l'état de connexion -->
      <template v-if="authStore.isLoggedIn">
        <p>Welcome, <strong>{{ authStore.username }}</strong>!</p> <!-- Affiche le username -->
        <RouterLink to="/investment">Investment</RouterLink> |
        <RouterLink to="/edit-invest">Edit Investments</RouterLink> |
        <RouterLink to="/statistics">Statistics</RouterLink> |
        <RouterLink to="/live-price">Live Price</RouterLink> |
        <RouterLink to="/indicators">Crypto Indicators</RouterLink> |
        <RouterLink to="/chat">Chat</RouterLink> |
        <button @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/register">Register</RouterLink> |
        <RouterLink to="/login">Login</RouterLink>
      </template>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
