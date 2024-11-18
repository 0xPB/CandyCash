<script setup>
import { ref, onMounted } from 'vue';
import { getInvestments } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

const investments = ref([]);
const authStore = useAuthStore();

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
          <th>Stock Name</th>
          <th>Purchase Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="investment in investments" :key="investment._id">
          <td>{{ investment.name }}</td>
          <td>${{ investment.price }}</td>
          <td>{{ investment.quantity }}</td>
          <td>${{ investment.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
