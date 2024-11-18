import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Assurez-vous que l'URL pointe vers votre backend
});

// Utilisateurs
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);

// Investissements
export const addInvestment = (data) => API.post('/investments', data);
export const getInvestments = (userId) => API.get(`/investments/${userId}`);

// Récupère le cours actuel d'un actif spécifique
export const getStockPrice = (symbol) => API.get(`/investments/price/${symbol}`);

// Récupère les investissements avec les prix actuels
export const getInvestmentsWithPrices = (userId) => API.get(`/investments/prices/${userId}`);

// Export pour récupérer le prix live d'une action
export const getCurrentStockPrice = (symbol) => API.get(`/investments/price/${symbol}`);