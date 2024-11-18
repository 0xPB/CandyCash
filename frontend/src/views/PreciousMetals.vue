<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const metals = ref([
  { name: 'Gold', symbol: 'XAU' },
  { name: 'Silver', symbol: 'XAG' },
]); // Liste des métaux : Or et Argent

const selectedMetal = ref(metals.value[0].symbol); // Sélection par défaut : Or
const metalData = ref(null); // Données du métal sélectionné

// Fonction pour récupérer les données d'un métal
async function fetchMetalData(symbol) {
  try {
    const { data } = await axios.get(`https://api.gold-api.com/price/${symbol}`);
    metalData.value = data; // Stocke les données du métal
  } catch (err) {
    console.error('Erreur lors de la récupération des données du métal :', err.message);
    alert('Impossible de récupérer les données pour le métal sélectionné.');
  }
}

// Met à jour les données lors du changement de sélection
async function handleMetalChange() {
  if (selectedMetal.value) {
    await fetchMetalData(selectedMetal.value);
  }
}

// Récupère les données lors du montage du composant
onMounted(() => {
  fetchMetalData(selectedMetal.value);
});
</script>

<template>
  <div>
    <h1>Prix des Métaux Précieux</h1>

    <!-- Sélecteur de métal -->
    <label for="metals">Sélectionnez un métal :</label>
    <select id="metals" v-model="selectedMetal" @change="handleMetalChange">
      <option v-for="metal in metals" :key="metal.symbol" :value="metal.symbol">
        {{ metal.name }} ({{ metal.symbol }})
      </option>
    </select>

    <!-- Informations sur le métal -->
    <div v-if="metalData" style="margin-top: 20px;">
      <h2>Informations sur le marché pour {{ metalData.name }}</h2>
      <p><strong>Symbole :</strong> {{ metalData.symbol }}</p>
      <p><strong>Prix :</strong> ${{ metalData.price }}</p>
      <p><strong>Dernière mise à jour :</strong> {{ metalData.updatedAtReadable }}</p>
    </div>
  </div>
</template>
