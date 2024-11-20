<script setup>
import { ref, onMounted } from 'vue';
import { getGlobalMetrics } from '@/services/api';

const globalMetrics = ref(null);

async function fetchGlobalMetrics() {
  try {
    const { data } = await getGlobalMetrics();
    globalMetrics.value = data;
  } catch (error) {
    console.error('Error fetching global metrics:', error.message);
    alert('Failed to fetch global metrics.');
  }
}

onMounted(fetchGlobalMetrics);
</script>

<template>
  <div>
    <h2>Global Metrics</h2>

  <div v-if="globalMetrics">
  <h3>General Statistics</h3>
  <ul>
    <li>Active Cryptocurrencies: {{ globalMetrics.data.active_cryptocurrencies }}</li>
    <li>Total Cryptocurrencies: {{ globalMetrics.data.total_cryptocurrencies }}</li>
    <li>Active Market Pairs: {{ globalMetrics.data.active_market_pairs }}</li>
    <li>Active Exchanges: {{ globalMetrics.data.active_exchanges }}</li>
    <li>Total Exchanges: {{ globalMetrics.data.total_exchanges }}</li>
  </ul>

  <h3>Dominance</h3>
  <ul>
    <li>BTC Dominance: {{ globalMetrics.data.btc_dominance.toFixed(2) }}%</li>
    <li>ETH Dominance: {{ globalMetrics.data.eth_dominance.toFixed(2) }}%</li>
    <li>BTC 24h Change: {{ globalMetrics.data.btc_dominance_24h_percentage_change.toFixed(2) }}%</li>
    <li>ETH 24h Change: {{ globalMetrics.data.eth_dominance_24h_percentage_change.toFixed(2) }}%</li>
  </ul>

  <h3>Market Cap & Volume (USD)</h3>
  <ul>
    <li>Total Market Cap: ${{ globalMetrics.data.quote.USD.total_market_cap.toLocaleString() }}</li>
    <li>Total Volume (24h): ${{ globalMetrics.data.quote.USD.total_volume_24h.toLocaleString() }}</li>
    <li>Altcoin Market Cap: ${{ globalMetrics.data.quote.USD.altcoin_market_cap.toLocaleString() }}</li>
    <li>Altcoin Volume (24h): ${{ globalMetrics.data.quote.USD.altcoin_volume_24h.toLocaleString() }}</li>
  </ul>

  <h3>DeFi Metrics</h3>
  <ul>
    <li>DeFi Market Cap: ${{ globalMetrics.data.quote.USD.defi_market_cap.toLocaleString() }}</li>
    <li>DeFi Volume (24h): ${{ globalMetrics.data.quote.USD.defi_volume_24h.toLocaleString() }}</li>
    <li>DeFi 24h Change: {{ globalMetrics.data.quote.USD.defi_24h_percentage_change.toFixed(2) }}%</li>
  </ul>

  <h3>Stablecoin Metrics</h3>
  <ul>
    <li>Stablecoin Market Cap: ${{ globalMetrics.data.quote.USD.stablecoin_market_cap.toLocaleString() }}</li>
    <li>Stablecoin Volume (24h): ${{ globalMetrics.data.quote.USD.stablecoin_volume_24h.toLocaleString() }}</li>
    <li>Stablecoin 24h Change: {{ globalMetrics.data.quote.USD.stablecoin_24h_percentage_change.toFixed(2) }}%</li>
  </ul>

  <h3>Derivatives Metrics</h3>
  <ul>
    <li>Derivatives Volume (24h): ${{ globalMetrics.data.quote.USD.derivatives_volume_24h.toLocaleString() }}</li>
    <li>Derivatives 24h Change: {{ globalMetrics.data.quote.USD.derivatives_24h_percentage_change.toFixed(2) }}%</li>
  </ul>
</div>


<div v-else>
  <p>Loading global metrics...</p>
  </div>
  </div>
</template>
