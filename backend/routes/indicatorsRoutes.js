import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/fear-and-greed', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY, // Assurez-vous que votre clé API est définie dans les variables d'environnement
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération de l’indice de peur et cupidité :', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération de l’indice de peur et cupidité.' });
  }
});

export default router;
