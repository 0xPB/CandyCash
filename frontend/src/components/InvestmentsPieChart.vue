<script setup>
import { ref, onMounted } from 'vue';
import { getInvestments } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const investments = ref([]); // Liste des investissements regroupés
const chart = ref(null); // Référence au graphique
const authStore = useAuthStore(); // Stock utilisateur pour l'ID connecté

// Fonction pour regrouper les investissements par nom d'action
function groupInvestmentsByName(data) {
  const grouped = {};

  data.forEach((inv) => {
    const total = inv.quantity * inv.price;
    if (!grouped[inv.name]) {
      grouped[inv.name] = {
        name: inv.name,
        total: total,
        quantity: inv.quantity, // Stocke la quantité pour les tooltips
      };
    } else {
      grouped[inv.name].total += total;
      grouped[inv.name].quantity += inv.quantity; // Ajoute la quantité
    }
  });

  return Object.values(grouped); // Retourne un tableau regroupé
}

// Fonction pour récupérer les investissements et mettre à jour le graphique
async function fetchInvestments() {
  try {
    const { data } = await getInvestments(authStore.userId);
    console.log('Fetched investments:', data);

    // Regroupe les investissements par nom et calcule les totaux
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

  const ctx = document.getElementById('investmentsPieChart').getContext('2d');
  const labels = investments.value.map((inv) => inv.name); // Noms des actions
  const data = investments.value.map((inv) => inv.total); // Totaux regroupés

  chart.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Investments Distribution',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#00FF00',
            '#0000FF',
            '#FFFF00',
            '#FF00FF',
          ],
        },
      ],
    },
    options: {
      responsive: false, // Taille fixe
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex;
              const quantity = investments.value[index].quantity; // Récupère la quantité
              return `${context.label}: ${quantity} units`; // Affiche la quantité
            },
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
    <h2>Investment Distribution by Total</h2>
    <canvas id="investmentsPieChart" width="400" height="400"></canvas> <!-- Taille du graphique -->
  </div>
</template>
