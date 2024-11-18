import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function getStockPrice(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    console.log('Alpha Vantage Response for', symbol, ':', response.data); // Log complet

    const price = response.data['Global Quote']?.['05. price'];
    if (!price) {
      throw new Error(`Failed to fetch stock price for ${symbol}: Invalid response format`);
    }
    return parseFloat(price);
  } catch (err) {
    console.error(`Error fetching price for ${symbol}:`, err.message);
    throw new Error('Failed to fetch stock price'); // Renvoie une erreur claire
  }
}
