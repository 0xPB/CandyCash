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

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Connexion réussie');
          // Rediriger vers la page de profil
          this.$router.push('/profile');
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Erreur de connexion', error);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: #ff69b4;
}
</style>
