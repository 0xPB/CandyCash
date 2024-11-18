import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/fear-and-greed', async (req, res) => {
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        },
      });
  
      // Retourner directement la réponse brute de l'API
      res.status(200).json(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération du Fear and Greed Index :', err.message);
      res.status(500).json({ message: 'Erreur lors de la récupération du Fear and Greed Index.' });
    }
  });
  

export default router;
