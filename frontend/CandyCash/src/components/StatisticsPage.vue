<template>
  <div class="statistics-page">
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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      investments: [],
      loading: true, // Indicateur de chargement
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/investments/all');
      this.investments = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des investissements:", error);
    } finally {
      this.loading = false; // Mettre fin au chargement
    }
  }
};
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
