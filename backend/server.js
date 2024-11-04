const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const investmentRoutes = require('./routes/investmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
