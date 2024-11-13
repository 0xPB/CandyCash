<template>
  <div class="statistics-page">
    <Navbar />
    <h1>Vos investissements</h1>
    <p v-if="loading">Chargement des investissements...</p>
    <table v-if="!loading && aggregatedInvestments.length > 0">
      <thead>
      <tr>
        <th>Catégorie</th>
        <th>Action</th>
        <th>Prix de Clôture (Semaine Dernière)</th>
        <th>Quantité Totale</th>
        <th>Valeur Totale</th>
        <th>Gain / Perte</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(investment, index) in aggregatedInvestments" :key="index">
        <td>{{ investment.category }}</td> <!-- Colonne pour la catégorie -->
        <td>{{ investment.stock }}</td>
        <td>{{ investment.lastWeekClose }} EUR</td> <!-- Prix de clôture de la semaine dernière -->
        <td>{{ investment.totalQuantity }}</td>
        <td>{{ (investment.totalQuantity * investment.price).toFixed(2) }} EUR</td> <!-- Valeur Totale -->
        <td>{{ calculateGainLoss(investment.lastWeekClose, investment.price, investment.totalQuantity) }} EUR</td> <!-- Calcul de gain/perte -->
      </tr>
      </tbody>
    </table>
    <p v-else-if="!loading">Aucun investissement trouvé.</p>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  },
  name: 'StatisticsPage',
  setup() {
    const investments = ref([]);
    const aggregatedInvestments = ref([]);
    const loading = ref(true);
    const userId = localStorage.getItem('userId');

    const fetchInvestments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/investments/all/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        investments.value = response.data;
        aggregateInvestments();
      } catch (error) {
        console.error("Erreur lors de la récupération des investissements:", error);
      } finally {
        loading.value = false;
      }
    };

    const aggregateInvestments = () => {
      const investmentMap = {};

      investments.value.forEach(investment => {
        if (investmentMap[investment.stock]) {
          investmentMap[investment.stock].totalQuantity += investment.quantity; // Somme des quantités
        } else {
          investmentMap[investment.stock] = {
            stock: investment.stock,
            category: investment.category, // Ajout de la catégorie
            price: investment.price, // Prix d'achat
            lastWeekClose: investment.lastWeekClose, // Prix de clôture de la semaine dernière
            totalQuantity: investment.quantity, // Quantité totale
          };
        }
      });

      aggregatedInvestments.value = Object.values(investmentMap);
    };

    const calculateGainLoss = (lastWeekClose, purchasePrice, quantity) => {
      const gainLoss = (lastWeekClose - purchasePrice) * quantity; // Calcul de la différence
      return gainLoss.toFixed(2); // Affiche la valeur avec deux décimales
    };

    onMounted(() => {
      if (userId) {
        fetchInvestments();
      } else {
        console.error("User ID is not available. Please log in.");
        loading.value = false;
      }
    });

    return {
      aggregatedInvestments,
      loading,
      calculateGainLoss,
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
