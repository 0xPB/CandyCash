<script setup>
import { ref, onMounted } from 'vue';
import { getInvestments } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const investments = ref([]); // Liste des investissements
const chart = ref(null); // Référence au graphique
const authStore = useAuthStore(); // Stock utilisateur pour l'ID connecté

// Fonction pour regrouper les données par nom d'action
function groupInvestmentsByName(data) {
  const grouped = {};

  data.forEach((inv) => {
    if (!grouped[inv.name]) {
      grouped[inv.name] = {
        name: inv.name,
        prices: [inv.price],
        quantities: [inv.quantity],
      };
    } else {
      grouped[inv.name].prices.push(inv.price); // Ajoute le prix
      grouped[inv.name].quantities.push(inv.quantity); // Ajoute la quantité
    }
  });

  return Object.values(grouped); // Retourne un tableau regroupé
}

// Fonction pour récupérer les investissements et mettre à jour le graphique
async function fetchInvestments() {
  try {
    const { data } = await getInvestments(authStore.userId);
    console.log('Fetched investments:', data);

    investments.value = groupInvestmentsByName(data);

    updateChart(); // Met à jour le graphique avec les données regroupées
  } catch (err) {
    console.error('Error fetching investments:', err.response?.data || err.message);
    alert('Failed to fetch investments.');
  }
}

// Fonction pour construire et afficher le graphique
function updateChart() {
  if (chart.value) {
    chart.value.destroy(); // Détruit l'ancien graphique avant d'en créer un nouveau
  }

  const ctx = document.getElementById('lineChartInvestments').getContext('2d');

  const datasets = investments.value.map((inv) => ({
    label: inv.name, // Nom de l'action
    data: inv.quantities.map((quantity, index) => ({
      x: inv.prices[index], // Prix
      y: quantity, // Quantité
    })), // Points du graphique
    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`, // Couleur aléatoire pour chaque ligne
    tension: 0.4, // Courbure des lignes
  }));

  chart.value = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: datasets,
    },
    options: {
      responsive: false, // Taille fixe
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Price ($)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Quantity',
          },
        },
      },
    },
  });
}

onMounted(() => {
  fetchInvestments(); // Récupère les données et initialise le graphique
});
</script>

<template>
  <div>
    <h2>Line Chart: Quantity vs Price</h2>
    <canvas id="lineChartInvestments" width="600" height="400"></canvas> <!-- Taille du graphique -->
  </div>
</template>
