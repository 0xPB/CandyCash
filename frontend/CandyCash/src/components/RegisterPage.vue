<template>
  <div class="register-page">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <input v-model="firstName" type="text" placeholder="Prénom" required />
      <input v-model="lastName" type="text" placeholder="Nom" required />
      <input v-model="age" type="number" placeholder="Âge" required />
      <select v-model="gender" required>
        <option value="">Sélectionner le sexe</option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
      </select>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <input v-model="postalAddress" type="text" placeholder="Adresse postale" required />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const store = useStore();
    const router = useRouter();

    // Champs du formulaire d'inscription
    const firstName = ref('');
    const lastName = ref('');
    const age = ref('');
    const gender = ref('');
    const email = ref('');
    const password = ref('');
    const postalAddress = ref('');

    // Fonction d'inscription
    const register = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            gender: gender.value,
            email: email.value,
            password: password.value,
            postalAddress: postalAddress.value,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Inscription réussie');
          // Enregistre le token reçu et connecte l'utilisateur automatiquement
          store.dispatch('login', data.token);
          router.push('/dashboard'); // Redirige vers le tableau de bord après l'inscription
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Erreur d'inscription:", error);
      }
    };

    return {
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
      postalAddress,
      register,
    };
  },
});
</script>

<style scoped>
.register-page {
  margin-top: 50px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #ff69b4;
}

input, select, button {
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
}
</style>
