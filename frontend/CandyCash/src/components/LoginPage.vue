<template>
  <div class="login-page">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const login = async () => {
      try {
        console.log('Tentative de connexion avec email:', email.value);

        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Erreur de connexion');

        // Stockez le token et l'ID utilisateur dans localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id); // Assurez-vous que data.user._id existe

        // Debugging : vérifiez si les données sont correctement stockées
        console.log("Token sauvegardé:", data.token);
        console.log("User ID sauvegardé:", data.user._id); // Modifié pour utiliser _id

        store.dispatch('login', data.token);
        router.push('/profile'); // Redirige après connexion réussie
      } catch (error) {
        console.error('Erreur de connexion:', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style scoped>
.login-page {
  margin-top: 50px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #ff69b4;
}
</style>
