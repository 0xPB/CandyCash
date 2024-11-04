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
    login() {
      alert(`Connexion avec l'email : ${this.email}`);
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
