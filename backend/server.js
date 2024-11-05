// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const investmentRoutes = require('./routes/investmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);

// Route pour récupérer tous les tickers
app.get('/api/tickers', async (req, res) => {
    try {
        const response = await axios.get('https://api.polygon.io/v3/reference/tickers', {
            params: {
                apiKey: process.env.POLYGON_API_KEY,
                limit: 1000,
            },
        });
        res.json(response.data.results);
    } catch (error) {
        console.error('Erreur lors de la récupération des tickers:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tickers' });
    }
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
