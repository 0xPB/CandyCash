import axios from 'axios';

// URL de base pour CoinMarketCap
const CMC_API = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v3', // API de CoinMarketCap
  headers: {
    'X-CMC_PRO_API_KEY': '5c8d10ad-fbd0-4dd3-bc57-23d9212fcca1', // Remplacez par votre clé API
  },
});

// URL de base pour le backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Assurez-vous que cela pointe bien vers votre backend
});


// Utilisateurs
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);

// Investissements
export const addInvestment = (data) => API.post('/investments', data);
export const getInvestments = (userId) => API.get(`/investments/${userId}`);

// Récupère le cours actuel d'un actif spécifique
export const getCurrentStockPrice = (symbol) => API.get(`/investments/price/${symbol}`);

// API pour récupérer les global metrics
export const getGlobalMetrics = () => axios.get('http://localhost:5000/api/global-metrics/');

// Mettre à jour un investissement
export const updateInvestment = (id, data) => API.put(`/investments/${id}`, data);

// Supprimer un investissement
export const deleteInvestment = (id) => API.delete(`/investments/${id}`);

