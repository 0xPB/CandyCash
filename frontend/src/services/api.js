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
  baseURL: 'http://A.B.C.D:5000/api', // Assurez-vous que cela pointe bien vers votre backend
});

const API_URL = 'http://A.B.C.D:5000/api';  // Votre URL backend

// Fonction de connexion d'utilisateur
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response;
  } catch (error) {
    throw error;  // Rejeter l'erreur pour qu'elle soit capturée dans le composant
  }
}

// Fonction d'inscription d'utilisateur
export async function registerUser(data) {
  try {
    const response = await API.post('/users/register', data);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour ajouter un investissement
export async function addInvestment(data) {
  try {
    const response = await API.post('/investments', data);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer les investissements d'un utilisateur
export async function getInvestments(userId) {
  try {
    const response = await API.get(`/investments/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer le prix actuel d'un actif
export async function getCurrentStockPrice(symbol) {
  try {
    const response = await API.get(`/investments/price/${symbol}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer les global metrics
export async function getGlobalMetrics() {
  try {
    const response = await axios.get(`${API_URL}/global-metrics/`);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour mettre à jour un investissement
export async function updateInvestment(id, data) {
  try {
    const response = await API.put(`/investments/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour supprimer un investissement
export async function deleteInvestment(id) {
  try {
    const response = await API.delete(`/investments/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour sauvegarder le total des profits et pertes
export async function saveProfitLoss(data) {
  try {
    const response = await API.post('/profit-loss', data);
    return response;
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer les profits et pertes d'un utilisateur
export async function getProfitLoss(userId) {
  try {
    const response = await API.get(`/profit-loss/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
