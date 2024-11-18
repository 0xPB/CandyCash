<script setup>
import { ref } from 'vue';
import { getCurrentStockPrice } from '@/services/api';

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

// Fonction pour récupérer le prix live
async function fetchLivePrice() {
  try {
    const { data } = await getCurrentStockPrice(selectedSymbol.value);
    livePrice.value = data.currentPrice;
  } catch (err) {
    console.error('Error fetching stock price:', err.response?.data || err.message);
    alert(`Failed to fetch price for ${selectedSymbol.value}`);
  }
}
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
    <button @click="fetchLivePrice">Request Current Price</button>

    <div v-if="livePrice !== null" style="margin-top: 20px;">
      <h2>Price for {{ selectedSymbol }}: ${{ livePrice }}</h2>
    </div>
  </div>
</template>
