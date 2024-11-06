<template>
  <div class="profile-page">
    <Navbar />
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
import Navbar from '@/components/Navbar.vue'; // Assurez-vous que le chemin est correct

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      selectedStock: '',
      stockPrice: null,
      quantity: 1,
      totalValue: null,
      sp500Tickers: [],
      userId: localStorage.getItem('userId'), // Récupérer l'ID utilisateur depuis localStorage
    };
  },
  methods: {
    async fetchStockPrice() {
      if (this.selectedStock) {
        try {
          const response = await axios.get(`http://localhost:5000/api/investments/stocks/${this.selectedStock}`);
          this.stockPrice = response.data.price;
          this.calculateValue();
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
      } else {
        this.totalValue = null;
      }
    },
    async saveInvestment() {
      console.log("Tentative d'enregistrement de l'investissement...", {
        stock: this.selectedStock,
        quantity: this.quantity,
        price: this.stockPrice,
        userId: this.userId, // Assurez-vous que l'ID utilisateur est utilisé
      });

      try {
        await axios.post('http://localhost:5000/api/investments/save', {
          stock: this.selectedStock,
          quantity: this.quantity,
          price: this.stockPrice,
          userId: this.userId, // Envoie userId avec les autres informations d'investissement
        });
        alert("Investissement enregistré !");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'investissement:", error);
        alert("Erreur lors de l'enregistrement de l'investissement"); // Affiche une alerte en cas d'erreur
      }
    },
    async fetchSp500Tickers() {
      try {
        const response = await axios.get('http://localhost:5000/api/investments/stocks/sp500');
        this.sp500Tickers = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tickers du S&P 500:", error);
      }
    }
  },
  mounted() {
    console.log("User ID from localStorage:", this.userId); // Vérifiez si l'ID utilisateur est correctement récupéré
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
