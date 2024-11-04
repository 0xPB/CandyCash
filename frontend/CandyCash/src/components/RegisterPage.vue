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

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      password: '',
      postalAddress: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            gender: this.gender,
            email: this.email,
            password: this.password,
            postalAddress: this.postalAddress,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Inscription réussie');
          this.$router.push('/login');
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Garde le style que nous avons créé pour l'esthétique Candy Crush */
</style>
