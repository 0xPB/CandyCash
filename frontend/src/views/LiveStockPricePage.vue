<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const stockSymbols = [
  { label: 'Apple', value: 'AAPL' },
  { label: 'Microsoft', value: 'MSFT' },
  { label: 'Google', value: 'GOOGL' },
  { label: 'Amazon', value: 'AMZN' },
  { label: 'NVIDIA', value: 'NVDA' },
  { label: 'Tesla', value: 'TSLA' },
  { label: 'Meta', value: 'META' },
  { label: 'Broadcom', value: 'AVGO' },
  { label: 'Salesforce', value: 'CRM' },
  { label: 'Adobe', value: 'ADBE' },
];

const selectedSymbol = ref(stockSymbols[0].value); // Par défaut, sélectionne Apple
const livePrice = ref(null); // Stocke le prix live
const errorMessage = ref('');

// Fonction pour récupérer le prix live
async function fetchLivePrice() {
  try {
    const response = await axios.get(`http://localhost:5000/api/investments/price/${selectedSymbol.value}`);
    livePrice.value = response.data.previousClose; // Remplacez `previousClose` par la propriété retournée par l'API
    errorMessage.value = '';
  } catch (err) {
    console.error('Error fetching stock price:', err.message);
    livePrice.value = null;
    errorMessage.value = 'Failed to fetch the stock price. Please try again later.';
  }
}

// Met à jour le prix lorsqu'un nouvel élément est sélectionné
watch(selectedSymbol, fetchLivePrice);

// Charger le prix initial lors du montage
fetchLivePrice();
</script>

<template>
  <div>
    <h1>US Stocks Live Price</h1>
    <label for="stock">Select a stock:</label>
    <select id="stock" v-model="selectedSymbol">
      <option v-for="stock in stockSymbols" :key="stock.value" :value="stock.value">
        {{ stock.label }} ({{ stock.value }})
      </option>
    </select>

    <div v-if="errorMessage" style="margin-top: 20px; color: red;">
      {{ errorMessage }}
    </div>

    <div v-else-if="livePrice !== null" style="margin-top: 20px;">
      <h2>Price for {{ selectedSymbol }}: ${{ livePrice }}</h2>
    </div>
  </div>
</template>
