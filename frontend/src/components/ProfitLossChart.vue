<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { getProfitLoss } from '@/services/api';
import { useAuthStore } from '@/stores/authStore'; // Import du store pour obtenir userId

Chart.register(...registerables);

const profitLossData = ref([]); // Stocke les données de profits/pertes
const chart = ref(null); // Référence au graphique

const authStore = useAuthStore(); // Initialisation du store

async function fetchProfitLoss() {
  try {
    const userId = authStore.userId; // Récupère l'ID utilisateur depuis le store
    const { data } = await getProfitLoss(userId);
    profitLossData.value = data;
    updateChart(); // Met à jour le graphique après avoir récupéré les données
  } catch (err) {
    console.error('Error fetching profit and loss data:', err.message);
    alert('Failed to fetch profit and loss data.');
  }
}

function updateChart() {
  if (chart.value) {
    chart.value.destroy(); // Détruit l'ancien graphique avant d'en créer un nouveau
  }

  const ctx = document.getElementById('profitLossChart').getContext('2d');
  
  const labels = profitLossData.value.map((entry) =>
    new Date(entry.date).toLocaleDateString() // Formatte les dates
  );
  const values = profitLossData.value.map((entry) => entry.value); // Profits/Pertes

  chart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Profit/Loss Over Time',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4, // Courbure des lignes
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Profit/Loss ($)',
          },
        },
      },
    },
  });
}

onMounted(() => {
  fetchProfitLoss(); // Récupère les données et initialise le graphique
});
</script>

<template>
  <div>
    <h1>Profit/Loss Line Chart</h1>
    <canvas id="profitLossChart" width="800" height="400"></canvas>
  </div>
</template>
