<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { loginUser } from '@/services/api';

const form = reactive({
  username: '',
  password: '',
});

const authStore = useAuthStore(); // Store pour gérer la connexion
const router = useRouter();

async function handleLogin() {
  try {
    const response = await loginUser(form);
    authStore.login(response.data.userId, response.data.username); // Met à jour l'état de connexion avec le username
    alert('Login successful!');
    router.push('/investment'); // Redirige vers la page Investment
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
