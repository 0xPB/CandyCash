<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { loginUser } from '@/services/api';
import sound from '../assets/sound/AppPage.mp3'; // Importer le fichier audio

const form = reactive({
  username: '',
  password: '',
});

const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  // Créer une instance Audio et jouer le son
  const audio = new Audio(sound);
  audio.play().catch(error => {
    console.error("Audio playback failed:", error);
  });

  try {
    // Effectuer la logique de connexion
    const response = await loginUser(form);
    authStore.login(response.data.userId, response.data.username);
    alert('Login successful!');
    router.push('/investment'); // Redirection après connexion
  } catch (err) {
    console.error(err);
    alert('Failed to login.');
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>Username:</label>
      <input v-model="form.username" type="text" required />
      <label>Password:</label>
      <input v-model="form.password" type="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
