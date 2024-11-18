<script setup>
import { reactive, ref } from 'vue';
import { addInvestment } from '@/services/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

// Liste des métaux précieux
const preciousMetals = [
  { name: 'Gold', symbol: 'XAU' },
  { name: 'Silver', symbol: 'XAG' },
];

// Données réactives pour l'investissement
const investment = reactive({
  name: preciousMetals[0].name, // Par défaut, sélectionne Gold
  symbol: preciousMetals[0].symbol, // Symbole correspondant
  price: 0, // Le prix sera mis à jour via l'API
  quantity: 1, // Quantité par défaut
});

const priceError = ref(null); // Erreur lors de la récupération du prix
const router = useRouter();
const authStore = useAuthStore();

// Fonction pour récupérer le prix du métal sélectionné
async function fetchPrice() {
  try {
    priceError.value = null; // Réinitialise l'erreur
    const { data } = await axios.get(`https://api.gold-api.com/price/${investment.symbol}`);
    investment.price = Number(data.price.toFixed(0)); // Formatte le prix en entier sans virgule
  } catch (err) {
    console.error('Error fetching price:', err.message);
    priceError.value = 'Failed to fetch price. Please try again later.';
  }
}

// Met à jour le symbole et le prix lorsque le métal est changé
function handleMetalChange() {
  const selectedMetal = preciousMetals.find((metal) => metal.name === investment.name);
  investment.symbol = selectedMetal.symbol;
  fetchPrice();
}

// Gère l'ajout d'un investissement
async function handleAddInvestment() {
  if (!authStore.isLoggedIn) {
    alert('You must be logged in to add an investment!');
    router.push('/login');
    return;
  }

  const total = investment.price * investment.quantity; // Calcul du total

  try {
    // Envoie les données au backend
    await addInvestment({
      userId: authStore.userId,
      name: investment.name,
      price: investment.price,
      quantity: investment.quantity,
      total, // Inclure le total
    });
    alert('Investment added successfully!');
    router.push('/statistics'); // Redirige vers la page "Statistics"
  } catch (err) {
    console.error('Error adding investment:', err.response?.data || err.message);
    alert('Failed to add investment.');
  }
}

// Initialisation du prix pour le métal par défaut
fetchPrice();
</script>

<template>
  <div>
    <h1>Add Precious Metals</h1>
    <form @submit.prevent="handleAddInvestment">
      <label for="name">Select Metal:</label>
      <select v-model="investment.name" id="name" @change="handleMetalChange" required>
        <option v-for="metal in preciousMetals" :key="metal.symbol" :value="metal.name">
          {{ metal.name }}
        </option>
      </select>

      <p v-if="priceError" style="color: red;">{{ priceError }}</p>
      <p v-else>Current Price: ${{ investment.price }}</p>

      <label for="quantity">Quantity:</label>
      <input v-model.number="investment.quantity" type="number" id="quantity" min="1" required />

      <button type="submit">Add Investment</button>
    </form>
  </div>
</template>
