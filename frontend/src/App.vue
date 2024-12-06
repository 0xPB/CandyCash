<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { ref, watchEffect } from 'vue'; // Import pour la réactivité
import sound from './assets/sound/Logout.mp3'; // Import du fichier audio pour le logout

const authStore = useAuthStore(); // Store d'authentification
const router = useRouter();

// Vérifie l'état de connexion au chargement
authStore.checkLogin();

// État réactif pour gérer le fichier CSS actuel
const currentTheme = ref('global.css');

// Fonction pour basculer entre deux fichiers CSS
function toggleTheme() {
  if (currentTheme.value === 'global.css') {
    currentTheme.value = 'retro.css'; // Change pour le fichier CSS rétro
  } else {
    currentTheme.value = 'global.css'; // Revient au fichier CSS global
  }
}

// Met à jour dynamiquement le fichier CSS lorsque le thème change
watchEffect(() => {
  const linkElement = document.getElementById('theme-stylesheet');
  if (linkElement) {
    linkElement.href = `/src/assets/styles/${currentTheme.value}`;
  }
});

// Fonction de déconnexion avec lecture d'un son
function handleLogout() {
  const audio = new Audio(sound);
  audio.play().catch((error) => {
    console.error('Audio playback failed:', error);
  });
  authStore.logout();
  router.push('/login'); // Redirige vers la page de connexion
}
</script>

<template>
  <header>
    <h1>CandyCash</h1>
    <nav>
      <template v-if="authStore.isLoggedIn">
        <p>Welcome, <strong>{{ authStore.username }}</strong>!</p>
        <RouterLink to="/investment" class="router-link">Investment</RouterLink> |
        <RouterLink to="/edit-invest" class="router-link">Edit Investments</RouterLink> |
        <RouterLink to="/statistics" class="router-link">Statistics</RouterLink> |
        <RouterLink to="/live-price" class="router-link">Live Price</RouterLink> |
        <RouterLink to="/indicators" class="router-link">Crypto Indicators</RouterLink> |
        <RouterLink to="/chat" class="router-link">Chat</RouterLink> |
        <!-- Bouton pour basculer entre les thèmes -->
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
