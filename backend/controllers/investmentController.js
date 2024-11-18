import Investment from '../models/Investment.js';
import { getStockPrice } from '../services/alphaVantage.js';

// Ajouter un investissement
export async function addInvestment(req, res) {
  const { userId, name, price, quantity, total } = req.body;

  if (!userId || !name || !price || !quantity || !total) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newInvestment = await Investment.create({
      userId,
      name,
      price,
      quantity,
      total,
    });
    res.status(201).json({ message: 'Investment added successfully', investment: newInvestment });
  } catch (err) {
    console.error('Error adding investment:', err);
    res.status(500).json({ message: 'Error adding investment', error: err.message });
  }
}


// Récupérer les investissements d'un utilisateur
export async function getInvestments(req, res) {
  const { userId } = req.params;

  try {
    const investments = await Investment.find({ userId });
    res.status(200).json(investments);
  } catch (err) {
    console.error('Error fetching investments:', err.message);
    res.status(500).json({ message: 'Error fetching investments', error: err.message });
  }
}

// Récupérer le prix actuel d'un actif spécifique
export async function getCurrentStockPrice(req, res) {
  const { symbol } = req.params;

  try {
    const previousClose = await getStockPrice(symbol); // Récupère la valeur "Previous Close" de l'API
    if (!previousClose) {
      return res.status(404).json({ message: `Price not found for symbol: ${symbol}` });
    }
    res.status(200).json({ symbol, previousClose });
  } catch (err) {
    console.error(`Error fetching price for ${symbol}:`, err.message);
    res.status(500).json({ message: 'Failed to fetch stock price', error: err.message });
  }
}

// Récupérer les investissements d'un utilisateur avec le prix actuel
export async function getInvestmentsWithPrices(req, res) {
  const { userId } = req.params;

  try {
    const investments = await Investment.find({ userId });

    const updatedInvestments = await Promise.all(
      investments.map(async (investment) => {
        try {
          const previousClose = await getStockPrice(investment.name); // Récupère "Previous Close"
          return { ...investment._doc, previousClose }; // Ajoute previousClose directement
        } catch (err) {
          console.error(`Error fetching price for ${investment.name}:`, err.message);
          return { ...investment._doc, previousClose: 'Unavailable' };
        }
      })
    );

    res.status(200).json(updatedInvestments);
  } catch (err) {
    console.error('Error fetching investments with prices:', err.message);
    res.status(500).json({ message: 'Error fetching investments with prices', error: err.message });
  }
}

// Mettre à jour un investissement
export async function updateInvestment(req, res) {
  const { id } = req.params;
  const { price, quantity, total } = req.body;

  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(
      id,
      { price, quantity, total },
      { new: true } // Retourne l'objet mis à jour
    );

    if (!updatedInvestment) {
      return res.status(404).json({ message: 'Investment not found.' });
    }

    res.status(200).json(updatedInvestment);
  } catch (err) {
    console.error('Error updating investment:', err.message);
    res.status(500).json({ message: 'Failed to update investment', error: err.message });
  }
}

// Supprimer un investissement
export async function deleteInvestment(req, res) {
  const { id } = req.params;

  try {
    const deletedInvestment = await Investment.findByIdAndDelete(id);

    if (!deletedInvestment) {
      return res.status(404).json({ message: 'Investment not found.' });
    }

    res.status(200).json({ message: 'Investment deleted successfully.' });
  } catch (err) {
    console.error('Error deleting investment:', err.message);
    res.status(500).json({ message: 'Failed to delete investment', error: err.message });
  }
}