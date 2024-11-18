<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fearAndGreedData = ref(null);
const errorMessage = ref(null);

// Fonction pour récupérer les données depuis l'API backend
async function fetchFearAndGreedIndex() {
  try {
    const response = await axios.get('http://localhost:5000/api/indicators/fear-and-greed');
    console.log('Fear and Greed Index Data:', response.data); // Log des données pour débogage
    fearAndGreedData.value = response.data.data;
  } catch (err) {
    console.error('Error fetching Fear and Greed Index:', err.message);
    errorMessage.value = 'Failed to fetch Fear and Greed Index. Please try again later.';
  }
}

onMounted(() => {
  fetchFearAndGreedIndex();
});
</script>

<template>
  <div>
    <h2>Fear and Greed Index</h2>
    <!-- Affiche un message d'erreur si une erreur survient -->
    <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>

    <!-- Affiche les données -->
    <div v-else-if="fearAndGreedData">
      <ul>
        <li><strong>Value:</strong> {{ fearAndGreedData.value }}</li>
        <li><strong>Classification:</strong> {{ fearAndGreedData.value_classification }}</li>
        <li><strong>Last Updated:</strong> {{ new Date(fearAndGreedData.update_time).toLocaleString() }}</li>
      </ul>
    </div>

    <!-- Affiche un message de chargement -->
    <div v-else>Loading...</div>
  </div>
</template>
