<script setup>
import { ref, onMounted } from 'vue';
import { getInvestments, updateInvestment, deleteInvestment } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

const investments = ref([]);
const authStore = useAuthStore();

// Fonction pour récupérer les investissements
async function fetchInvestments() {
  try {
    const { data } = await getInvestments(authStore.userId);
    console.log('Fetched investments:', data);
    investments.value = data;
  } catch (err) {
    console.error('Error fetching investments:', err.response?.data || err.message);
    alert('Failed to fetch investments.');
  }
}

// Fonction pour mettre à jour un investissement
async function handleUpdateInvestment(investment) {
  try {
    const total = investment.price * investment.quantity;
    await updateInvestment(investment._id, { price: investment.price, quantity: investment.quantity, total });
    alert('Investment updated successfully.');
    fetchInvestments(); // Recharge les données
  } catch (err) {
    console.error('Error updating investment:', err.response?.data || err.message);
    alert('Failed to update investment.');
  }
}

// Fonction pour supprimer un investissement
async function handleDeleteInvestment(investmentId) {
  if (!confirm('Are you sure you want to delete this investment?')) {
    return;
  }

  try {
    await deleteInvestment(investmentId);
    alert('Investment deleted successfully.');
    investments.value = investments.value.filter((inv) => inv._id !== investmentId);
  } catch (err) {
    console.error('Error deleting investment:', err.response?.data || err.message);
    alert('Failed to delete investment.');
  }
}

onMounted(() => {
  fetchInvestments();
});
</script>

<template>
  <div>
    <h1>Edit Investments</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Purchase Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investment in investments" :key="investment._id">
          <td>{{ investment.name }}</td>
          <td>
            <input
              type="number"
              v-model.number="investment.price"
              min="0"
              step="0.01"
              @change="handleUpdateInvestment(investment)"
            />
          </td>
          <td>
            <input
              type="number"
              v-model.number="investment.quantity"
              min="1"
              @change="handleUpdateInvestment(investment)"
            />
          </td>
          <td>${{ (investment.price * investment.quantity).toFixed(2) }}</td>
          <td>
            <button @click="handleDeleteInvestment(investment._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
