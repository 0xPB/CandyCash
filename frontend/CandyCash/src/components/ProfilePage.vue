<template>
  <div class="profile-page">
    <h1>Calcul de la valeur de vos actions</h1>

    <!-- Sélection de l'action -->
    <label for="stock-select">Choisissez une action :</label>
    <select v-model="selectedStock" id="stock-select" @change="fetchStockPrice">
      <option disabled value="">Sélectionnez une action</option>
      <option v-for="stock in sp500Tickers" :key="stock.symbol" :value="stock.symbol">
        {{ stock.name }} ({{ stock.symbol }})
      </option>
    </select>

    <!-- Entrée pour la quantité -->
    <label for="quantity">Quantité possédée :</label>
    <input type="number" v-model="quantity" id="quantity" placeholder="Entrez la quantité" @input="calculateValue"/>

    <!-- Affichage du prix actuel et de la valeur totale en euros -->
    <p v-if="stockPrice !== null">Prix actuel de {{ selectedStock }} : {{ stockPrice }} EUR</p>
    <p v-if="totalValue !== null">Valeur totale : {{ totalValue }} EUR</p>

    <!-- Bouton pour enregistrer dans MongoDB -->
    <button @click="saveInvestment">Enregistrer l'investissement</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedStock: '',
      stockPrice: null,
      quantity: 1,
      totalValue: null,
      sp500Tickers: [], // Liste des tickers du S&P 500
      userId: 'exampleUserId', // Utiliser une valeur d'exemple, assurez-vous de la remplacer par le vrai ID utilisateur
    };
  },
  methods: {
    async fetchStockPrice() {
      if (this.selectedStock) {
        try {
          const response = await axios.get(`http://localhost:5000/api/investments/stocks/${this.selectedStock}`);
          this.stockPrice = response.data.price;
          this.calculateValue();
          console.log("Prix de l'action récupéré :", this.stockPrice);
        } catch (error) {
          console.error('Erreur lors de la récupération du prix de l’action:', error);
          this.stockPrice = null;
          this.totalValue = null;
        }
      }
    },
    calculateValue() {
      if (this.stockPrice !== null && this.quantity > 0) {
        this.totalValue = (this.stockPrice * this.quantity).toFixed(2);
        console.log("Valeur totale calculée :", this.totalValue);
      } else {
        this.totalValue = null;
      }
    },
    async saveInvestment() {
      console.log("Tentative d'enregistrement de l'investissement...");
      if (!this.selectedStock || !this.quantity || !this.stockPrice) {
        alert("Veuillez remplir tous les champs.");
        console.log("Champs manquants : ", {
          selectedStock: this.selectedStock,
          quantity: this.quantity,
          stockPrice: this.stockPrice,
        });
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/investments/save', {
          stock: this.selectedStock,
          quantity: this.quantity,
          price: this.stockPrice,
          userId: this.userId, // Envoie userId avec les autres informations d'investissement
        });
        alert("Investissement enregistré avec succès !");
        console.log("Réponse de l'enregistrement :", response.data);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'investissement:", error);
        if (error.response) {
          console.log("Détails de l'erreur de réponse :", error.response.data);
        }
      }
    },
    async fetchSp500Tickers() {
      try {
        const response = await axios.get('http://localhost:5000/api/investments/stocks/sp500');
        this.sp500Tickers = response.data;
        console.log("Tickers S&P 500 récupérés :", this.sp500Tickers);
      } catch (error) {
        console.error("Erreur lors de la récupération des tickers du S&P 500:", error);
      }
    }
  },
  mounted() {
    this.fetchSp500Tickers();
  }
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
p {
  font-size: 1.2em;
  margin-top: 15px;
  color: #333;
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
