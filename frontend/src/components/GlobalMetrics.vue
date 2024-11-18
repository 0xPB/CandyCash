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
      <p>Active Cryptocurrencies: {{ globalMetrics.data.active_cryptocurrencies }}</p>
      <p>Total Cryptocurrencies: {{ globalMetrics.data.total_cryptocurrencies }}</p>
      <p>Active Market Pairs: {{ globalMetrics.data.active_market_pairs }}</p>
      <p>Active Exchanges: {{ globalMetrics.data.active_exchanges }}</p>
      <p>Total Exchanges: {{ globalMetrics.data.total_exchanges }}</p>

      <h3>Dominance</h3>
      <p>BTC Dominance: {{ globalMetrics.data.btc_dominance.toFixed(2) }}%</p>
      <p>ETH Dominance: {{ globalMetrics.data.eth_dominance.toFixed(2) }}%</p>
      <p>BTC 24h Change: {{ globalMetrics.data.btc_dominance_24h_percentage_change.toFixed(2) }}%</p>
      <p>ETH 24h Change: {{ globalMetrics.data.eth_dominance_24h_percentage_change.toFixed(2) }}%</p>

      <h3>Market Cap & Volume (USD)</h3>
      <p>Total Market Cap: ${{ globalMetrics.data.quote.USD.total_market_cap.toLocaleString() }}</p>
      <p>Total Volume (24h): ${{ globalMetrics.data.quote.USD.total_volume_24h.toLocaleString() }}</p>
      <p>Altcoin Market Cap: ${{ globalMetrics.data.quote.USD.altcoin_market_cap.toLocaleString() }}</p>
      <p>Altcoin Volume (24h): ${{ globalMetrics.data.quote.USD.altcoin_volume_24h.toLocaleString() }}</p>

      <h3>DeFi Metrics</h3>
      <p>DeFi Market Cap: ${{ globalMetrics.data.quote.USD.defi_market_cap.toLocaleString() }}</p>
      <p>DeFi Volume (24h): ${{ globalMetrics.data.quote.USD.defi_volume_24h.toLocaleString() }}</p>
      <p>DeFi 24h Change: {{ globalMetrics.data.quote.USD.defi_24h_percentage_change.toFixed(2) }}%</p>

      <h3>Stablecoin Metrics</h3>
      <p>Stablecoin Market Cap: ${{ globalMetrics.data.quote.USD.stablecoin_market_cap.toLocaleString() }}</p>
      <p>Stablecoin Volume (24h): ${{ globalMetrics.data.quote.USD.stablecoin_volume_24h.toLocaleString() }}</p>
      <p>Stablecoin 24h Change: {{ globalMetrics.data.quote.USD.stablecoin_24h_percentage_change.toFixed(2) }}%</p>

      <h3>Derivatives Metrics</h3>
      <p>Derivatives Volume (24h): ${{ globalMetrics.data.quote.USD.derivatives_volume_24h.toLocaleString() }}</p>
      <p>Derivatives 24h Change: {{ globalMetrics.data.quote.USD.derivatives_24h_percentage_change.toFixed(2) }}%</p>
    </div>

    <div v-else>
      <p>Loading global metrics...</p>
    </div>
  </div>
</template>
