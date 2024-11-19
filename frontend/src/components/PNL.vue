<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getInvestments, getCurrentStockPrice, saveProfitLoss } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const state = reactive({
  investments: [],
  profitLoss: {}, // Stocke les profits/pertes pour chaque actif
  totalProfitLoss: 0, // Stocke le total des profits/pertes
  isCalculating: false, // État pour afficher le processus de calcul
});

// Métaux précieux avec prix par défaut (peut être remplacé par un appel API)
const preciousMetalsPrices = {
  Gold: 2000, // Exemple de prix actuel en dollars
  Silver: 25, // Exemple de prix actuel en dollars
};

// Fonction pour récupérer les investissements
async function fetchInvestments() {
  try {
    const { data } = await getInvestments(authStore.userId);
    state.investments = data.map((investment) => ({
      ...investment,
      currentPrice: 0, // Initialiser le prix actuel à 0
    }));
    console.log('Investments fetched:', state.investments);
  } catch (err) {
    console.error('Error fetching investments:', err.response?.data || err.message);
    alert('Failed to fetch investments.');
  }
}

// Fonction pour calculer les profits/pertes
function calculateProfitLoss() {
  console.log('Calculating profit/loss...');
  let total = 0;

  state.investments.forEach((investment) => {
    const { price, quantity, currentPrice } = investment;
    const profitLoss = (currentPrice - price) * quantity;
    state.profitLoss[investment.name] = profitLoss || 0;
    total += profitLoss || 0;
  });

  state.totalProfitLoss = total;
  console.log('Profit/Loss calculated:', state.profitLoss, 'Total:', state.totalProfitLoss);
}

// Fonction pour récupérer les prix actuels
async function fetchCurrentPrices() {
  const allowedSymbols = [
    'AAPL',
    'MSFT',
    'GOOGL',
    'AMZN',
    'NVDA',
    'TSLA',
    'META',
    'AVGO',
    'CRM',
    'ADBE',
  ];

  state.isCalculating = true; // Active l'indicateur de calcul

  for (const investment of state.investments) {
    if (allowedSymbols.includes(investment.name)) {
      try {
        const { data } = await getCurrentStockPrice(investment.name);
        investment.currentPrice = data.previousClose || 0; // Met à jour le prix actuel
        console.log(`Price for ${investment.name}: $${investment.currentPrice}`);
      } catch (err) {
        console.error(`Error fetching price for ${investment.name}:`, err.message);
        investment.currentPrice = 0; // Assure une valeur par défaut
      }
    } else if (preciousMetalsPrices[investment.name]) {
      // Récupère le prix des métaux précieux
      investment.currentPrice = preciousMetalsPrices[investment.name];
      console.log(`Price for ${investment.name}: $${investment.currentPrice}`);
    } else {
      investment.currentPrice = 0; // Actifs non supportés
    }
  }

  calculateProfitLoss(); // Calcule les profits/pertes après la mise à jour des prix
  state.isCalculating = false; // Désactive l'indicateur de calcul
}

// Fonction pour sauvegarder les profits/pertes
async function saveTotalProfitLoss() {
  const data = {
    userId: authStore.userId,
    value: state.totalProfitLoss,
    date: new Date().toISOString(),
  };

  try {
    await saveProfitLoss(data);
    alert('Profit/Loss saved successfully!');
  } catch (err) {
    console.error('Error saving total profit/loss:', err.response?.data || err.message);
    alert('Failed to save profit/loss.');
  }
}

// Récupère les investissements au montage
onMounted(() => {
  fetchInvestments();
});
</script>

<template>
  <div>
    <h1>Investments Table</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Asset Name</th>
          <th>Purchase Price</th>
          <th>Quantity</th>
          <th>Total Investment</th>
          <th>Current Price</th>
          <th>Profit/Loss</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investment in state.investments" :key="investment._id">
          <td>{{ investment.name }}</td>
          <td>${{ investment.price }}</td>
          <td>{{ investment.quantity }}</td>
          <td>${{ (investment.price * investment.quantity).toFixed(2) }}</td>
          <td>${{ investment.currentPrice }}</td>
          <td>${{ state.profitLoss[investment.name]?.toFixed(2) || 0 }}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 20px;">
      <button @click="fetchCurrentPrices" :disabled="state.isCalculating">
        {{ state.isCalculating ? 'Updating Prices...' : 'Update Prices' }}
      </button>
      <button @click="saveTotalProfitLoss">Save Profit/Loss</button>
    </div>

    <div style="margin-top: 20px;">
      <h2>Total Profit/Loss: ${{ state.totalProfitLoss.toFixed(2) }}</h2>
    </div>
  </div>
</template>
