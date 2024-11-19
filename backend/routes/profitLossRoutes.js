import express from 'express';
import ProfitLoss from '../models/ProfitLoss.js'; // Modèle MongoDB pour les profits/pertes

const router = express.Router();

// Route POST pour sauvegarder un profit/perte
router.post('/', async (req, res) => {
  try {
    const { userId, value, date } = req.body;

    // Vérification des champs nécessaires
    if (!userId || !value || !date) {
      return res.status(400).json({ message: 'userId, value, and date are required.' });
    }

    // Création d'une nouvelle entrée dans la collection ProfitLoss
    const newProfitLoss = new ProfitLoss({ userId, value, date });
    await newProfitLoss.save();

    res.status(201).json({ message: 'Profit/Loss saved successfully.' });
  } catch (err) {
    console.error('Error saving Profit/Loss:', err.message);
    res.status(500).json({ message: 'Failed to save profit/loss.', error: err.message });
  }
});

// Route GET pour récupérer les profits/pertes d'un utilisateur spécifique
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérification si `userId` est présent
    if (!userId) {
      return res.status(400).json({ message: 'userId is required.' });
    }

    // Récupération des données filtrées par userId
    const data = await ProfitLoss.find({ userId }).sort({ date: 1 }); // Trie les données par date croissante

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching Profit/Loss data:', err.message);
    res.status(500).json({ message: 'Failed to fetch profit/loss data.', error: err.message });
  }
});

export default router;
