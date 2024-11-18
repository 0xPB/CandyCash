import axios from 'axios';

export async function getFearAndGreedIndex(req, res) {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY, // Assurez-vous que votre clé API est définie dans vos variables d'environnement
      },
    });
    console.log('Fear and Greed API Response:', response.data); // Affiche la réponse dans la console backend
    res.status(200).json(response.data);
  } catch (err) {
    console.error('Erreur lors de la récupération de l’indice de peur et cupidité :', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération de l’indice de peur et cupidité.' });
  }
}
