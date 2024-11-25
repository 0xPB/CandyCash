<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import './assets/styles/global.css'; // Import du fichier CSS global
import sound from './assets/sound/Logout.mp3'; // Importer le fichier audio

const authStore = useAuthStore(); // Accès au store
const router = useRouter();

// Vérifie l'état de connexion au chargement
authStore.checkLogin();



function handleLogout() {
 // Créer une instance Audio et jouer le son
 const audio = new Audio(sound);
  audio.play().catch(error => {
    console.error("Audio playback failed:", error);
  });
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
        <RouterLink to="/investment" class="router-link">Investment</RouterLink> |
        <RouterLink to="/edit-invest"class="router-link">Edit Investments</RouterLink> |
        <RouterLink to="/statistics" class="router-link">Statistics</RouterLink> |
        <RouterLink to="/live-price" class="router-link">Live Price</RouterLink> |
        <RouterLink to="/indicators" class="router-link">Crypto Indicators</RouterLink> |
        <RouterLink to="/chat" class="router-link">Chat</RouterLink> |
        <button @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/register" class="router-link">Register</RouterLink> |
        <RouterLink to="/login" class="router-link">Login</RouterLink>
      </template>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
