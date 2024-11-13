<template>
  <div class="profile-page">
    <RouterLink to="/statistics" class="btn signup">Statistiques</RouterLink>
    <h1>Calcul de la valeur de vos actions</h1>

    <!-- Sélection de la catégorie -->
    <label for="category-select">Choisissez une catégorie :</label>
    <select v-model="selectedCategory" id="category-select" @change="updateAssets">
      <option disabled value="">Sélectionnez une catégorie</option>
      <option v-for="category in categories" :key="category">{{ category }}</option>
    </select>

    <!-- Sélection de l'actif -->
    <label for="asset-select">Choisissez un actif :</label>
    <select v-model="selectedAsset" id="asset-select">
      <option disabled value="">Sélectionnez un actif</option>
      <option v-for="asset in assets" :key="asset.symbol" :value="asset">{{ asset.name }} ({{ asset.symbol }})</option>
    </select>

    <!-- Entrée pour la quantité -->
    <label for="quantity">Quantité possédée :</label>
    <input type="number" v-model="quantity" id="quantity" placeholder="Entrez la quantité" />

    <!-- Entrée pour le prix d'achat -->
    <label for="purchase-price">Prix d'achat :</label>
    <input type="number" v-model="purchasePrice" id="purchase-price" placeholder="Entrez le prix d'achat" />

    <!-- Bouton pour enregistrer dans MongoDB -->
    <button @click="saveInvestment">Enregistrer l'investissement</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCategory: '',
      selectedAsset: null,
      quantity: 1,
      purchasePrice: null,
      assets: [],
      categories: ['Actions', 'Cryptos', 'Indices', 'Matières Premières'],
    };
  },
  methods: {
    updateAssets() {
      if (this.selectedCategory === 'Actions') {
        this.assets = [
          { name: 'Microsoft', symbol: 'MSFT' },
        ];
      } else if (this.selectedCategory === 'Cryptos') {
        this.assets = [
          { name: 'Bitcoin', symbol: 'BTC' },
        ];
      } else if (this.selectedCategory === 'Indices') {
        this.assets = [
          { name: 'S&P 500', symbol: 'SPX' },
        ];
      } else if (this.selectedCategory === 'Matières Premières') {
        this.assets = [
          { name: 'Gold', symbol: 'GOLD' },
        ];
      }
    },
    async fetchLastWeekClose(symbol) {
      const apiKey = 'HJSMM7PI39Q5KT5A'; // Clé API
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_WEEKLY',
            symbol: symbol,
            apikey: apiKey,
          },
        });

        const timeSeries = response.data['Weekly Time Series'];
        const latestDates = Object.keys(timeSeries).slice(0, 2); // Récupère les deux dernières semaines

        if (latestDates.length >= 2) {
          const lastWeekData = timeSeries[latestDates[1]]; // Données de la semaine précédente
          return parseFloat(lastWeekData['4. close']); // Prix de clôture de la semaine précédente
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération du prix pour ${symbol}:`, error);
      }
      return null; // Si une erreur se produit ou aucune donnée n'est trouvée
    },
    async saveInvestment() {
      if (!this.selectedAsset || !this.quantity || !this.purchasePrice) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const lastWeekClose = await this.fetchLastWeekClose(this.selectedAsset.symbol); // Récupère le prix de la semaine dernière

      try {
        await axios.post('http://localhost:5000/api/investments/save', {
          stock: this.selectedAsset.symbol,
          quantity: this.quantity,
          price: this.purchasePrice,
          userId: localStorage.getItem('userId'),
          lastWeekClose: lastWeekClose, // Envoie le prix de la semaine dernière
          category: this.selectedCategory // Envoie la catégorie
        });
        alert("Investissement enregistré avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'investissement:", error);
        alert("Erreur lors de l'enregistrement de l'investissement.");
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
}
label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
input, select {
  margin: 5px 0;
  padding: 8px;
  font-size: 16px;
  width: 100%;
}
button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
