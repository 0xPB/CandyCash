<script setup>
import { reactive } from 'vue';
import { addInvestment } from '@/services/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Liste des entreprises technologiques
const techCompanies = [
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

// Données réactives pour l'investissement
const investment = reactive({
  name: techCompanies[0], // Par défaut, sélectionne la première entreprise
  price: 0,
  quantity: 1, // Quantité par défaut
});

const router = useRouter();
const authStore = useAuthStore();

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
</script>

<template>
  <div>
    <h1>Add US Stocks</h1>
    <form @submit.prevent="handleAddInvestment">
      <label for="name">Select Company:</label>
      <select v-model="investment.name" id="name" required>
        <option v-for="company in techCompanies" :key="company" :value="company">
          {{ company }}
        </option>
      </select>

      <label for="price">Price:</label>
      <input v-model.number="investment.price" type="number" id="price" required />

      <label for="quantity">Quantity:</label>
      <input v-model.number="investment.quantity" type="number" id="quantity" min="1" required />

      <button type="submit">Add Investment</button>
    </form>
  </div>
</template>
