const express = require('express');
const axios = require('axios');
const Investment = require('../models/Investment'); // Modèle MongoDB
require('dotenv').config(); // Charger les variables d'environnement
const router = express.Router();

// Liste des tickers pour chaque catégorie
const tickers = {
    actions: [
        "AAPL", "MSFT", "AMZN", "GOOGL", "FB",
    ],
    cryptos: [
        "BTC", "ETH", "XRP", "LTC", "ADA",
    ],
    indices: [
        "SPX", "DJI", "IXIC", "FTSE", "DAX",
    ],
    matieresPremieres: [
        "GOLD", "SILVER", "OIL", "GAS", "COPPER",
    ]
};

// Route pour récupérer les prix d'un actif spécifique
router.get('/price/:category/:symbol', async (req, res) => {
    const { category, symbol } = req.params;
    const apiKey = process.env.VUE_APP_ALPHAVANTAGE_API_KEY; // Récupération de la clé API

    let functionType;
    switch (category) {
        case 'actions':
            functionType = 'TIME_SERIES_DAILY';
            break;
        case 'cryptos':
            functionType = 'DIGITAL_CURRENCY_DAILY';
            break;
        case 'indices':
            functionType = 'TIME_SERIES_DAILY';
            break;
        case 'matieresPremieres':
            functionType = 'TIME_SERIES_DAILY';
            break;
        default:
            return res.status(400).json({ error: "Catégorie non valide." });
    }

    try {
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: functionType,
                symbol: symbol,
                apikey: apiKey,
            },
        });

        // Gérer les réponses selon le type d'actif
        let price;
        if (category === 'actions' || category === 'indices') {
            const timeSeries = response.data['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0]; // Dernière date
            price = timeSeries[latestDate]['4. close']; // Prix de clôture
        } else if (category === 'cryptos') {
            const timeSeries = response.data['Time Series (Digital Currency Daily)'];
            const latestDate = Object.keys(timeSeries)[0]; // Dernière date
            price = timeSeries[latestDate]['4a. close (USD)']; // Prix de clôture
        } else if (category === 'matieresPremieres') {
            const timeSeries = response.data['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0]; // Dernière date
            price = timeSeries[latestDate]['4. close']; // Prix de clôture
        }

        if (price) {
            res.json({ price });
        } else {
            res.status(404).json({ error: "Prix non trouvé pour cet actif." });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des prix.' });
    }
});

// Route pour enregistrer un investissement
router.post('/save', async (req, res) => {
    const { stock, quantity, price, userId, lastWeekClose, category } = req.body;

    // Assurez-vous que tous les champs sont présents
    if (!stock || !quantity || !price || !userId || !lastWeekClose || !category) {
        return res.status(400).json({ error: "Tous les champs (stock, quantity, price, userId, lastWeekClose, category) sont requis." });
    }

    try {
        const newInvestment = new Investment({ stock, quantity, price, user: userId, lastWeekClose, category });
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
