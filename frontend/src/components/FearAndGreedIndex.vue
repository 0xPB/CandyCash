<template>
    <div>
      <h2>Indice de Peur et de Cupidité</h2>
      <p>Niveau Actuel : {{ fearAndGreed.level }}</p>
      <p>Score : {{ fearAndGreed.score }}</p>
      <img
        src="https://alternative.me/crypto/fear-and-greed-index.png"
        alt="Latest Crypto Fear & Greed Index"
        style="width: 100%; max-width: 400px; height: auto;"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const fearAndGreed = ref({ level: '', score: 0 });
  
  async function fetchFearAndGreedIndex() {
    try {
      const response = await axios.get('/api/indicators/fear-and-greed');
      const data = response.data.data;
      fearAndGreed.value.level = data.value_classification;
      fearAndGreed.value.score = data.value;
    } catch (error) {
      console.error('Erreur lors de la récupération de l’indice de peur et cupidité :', error.message);
    }
  }
  
  onMounted(() => {
    fetchFearAndGreedIndex();
  });
  </script>
  