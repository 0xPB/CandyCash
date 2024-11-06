const express = require('express');
const axios = require('axios');
const Investment = require('../models/Investment'); // Modèle MongoDB
const router = express.Router();

// Liste des tickers du S&P 500
const sp500Tickers = [
    "AAPL", "MSFT", "AMZN", "GOOGL", "FB", "BRK.B", "JNJ", "V", "PG", "JPM",
    "UNH", "NVDA", "HD", "DIS", "PYPL", "MA", "NFLX", "VZ", "ADBE", "INTC",
    "CMCSA", "PFE", "KO", "PEP", "T", "MRK", "NKE", "TMO", "XOM", "ABT", "CSCO",
    // Ajouter les autres tickers du S&P 500 ici si besoin...
];

// Route pour récupérer la liste des tickers du S&P 500
router.get('/stocks/sp500', (req, res) => {
    const tickers = sp500Tickers.map(ticker => ({
        symbol: ticker,
        name: ticker,
    }));
    res.json(tickers);
});

// Route pour récupérer le prix d'une action spécifique
router.get('/stocks/:ticker', async (req, res) => {
    const { ticker } = req.params;

    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`, {
            params: {
                adjusted: true,
                apiKey: process.env.POLYGON_API_KEY,
            },
        });
        const price = response.data.results[0]?.c; // Récupérer le dernier prix de clôture
        if (price) {
            res.json({ price });
        } else {
            res.status(404).json({ error: "Données non trouvées pour l'action sélectionnée." });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du prix de l’action:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de Polygon pour les actions.' });
    }
});

// Route pour enregistrer un investissement
router.post('/save', async (req, res) => {
    const { stock, quantity, price, userId } = req.body;

    // Assurez-vous que tous les champs sont présents
    if (!stock || !quantity || !price || !userId) {
        return res.status(400).json({ error: "Tous les champs (stock, quantity, price, userId) sont requis." });
    }

    try {
        const newInvestment = new Investment({ stock, quantity, price, user: userId });
        await newInvestment.save();
        res.status(201).json({ message: "Investissement enregistré avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'investissement:", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement de l'investissement" });
    }
});

// Route pour récupérer tous les investissements d'un utilisateur spécifique
router.get('/all/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const investments = await Investment.find({ user: userId });
        res.json(investments);
    } catch (error) {
        console.error("Erreur lors de la récupération des investissements:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des investissements" });
    }
});

module.exports = router;
