<template>
  <header class="header">
    <h1>CandyCash</h1>
    <nav class="navigation">
      <div v-if="!isLoggedIn">
        <RouterLink to="/login" class="btn login">Se connecter</RouterLink>
        <RouterLink to="/register" class="btn signup">S'inscrire</RouterLink>
      </div>
      <div v-else>
        <button @click="logout" class="btn logout">Se déconnecter</button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Importer useRouter pour la redirection

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore();
    const router = useRouter(); // Initialiser le router

    // Accède à l’état de connexion via computed
    const isLoggedIn = computed(() => store.state.isLoggedIn);

    // Fonction de déconnexion
    const logout = () => {
      store.dispatch('logout'); // Appelle la fonction de déconnexion dans Vuex
      router.push('/'); // Redirige vers la racine après la déconnexion
    };

    return {
      isLoggedIn,
      logout,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
}

.navigation {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #ff69b4;
  text-decoration: none;
}

.btn.logout {
  background-color: #e74c3c;
}
</style>
