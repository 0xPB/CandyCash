<template>
  <div class="statistics-page">
    <Navbar />
    <h1>Vos investissements</h1>
    <p v-if="loading">Chargement des investissements...</p>
    <table v-if="!loading && investments.length > 0">
      <thead>
      <tr>
        <th>Action</th>
        <th>Prix</th>
        <th>Quantité</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="investment in investments" :key="investment._id">
        <td>{{ investment.stock }}</td>
        <td>{{ investment.price }} EUR</td>
        <td>{{ investment.quantity }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else-if="!loading">Aucun investissement trouvé.</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue'; // Assurez-vous que le chemin est correct

export default defineComponent({
  components: {
    Navbar,
  },
  name: 'StatisticsPage',
  setup() {
    // Données de la page
    const investments = ref([]);
    const loading = ref(true);
    const userId = localStorage.getItem('userId'); // Récupération dynamique de l'ID utilisateur

    // Fonction pour récupérer les investissements
    const fetchInvestments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/investments/all/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Passe le token d'authentification si nécessaire
          },
        });
        investments.value = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des investissements:", error);
      } finally {
        loading.value = false;
      }
    };

    // Récupère les investissements au montage du composant
    onMounted(() => {
      if (userId) {
        fetchInvestments();
      } else {
        console.error("User ID is not available. Please log in.");
        loading.value = false;
      }
    });

    return {
      investments,
      loading,
    };
  },
});
</script>

<style scoped>
.statistics-page {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
