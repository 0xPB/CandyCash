import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route pour récupérer les global metrics depuis l'API CoinMarketCap
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching global metrics:', error.message);
    res.status(500).json({ message: 'Failed to fetch global metrics', error: error.message });
  }
});

export default router;
