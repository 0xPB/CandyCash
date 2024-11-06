const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const { getTop50SP500ByMarketCap } = require('./services/polygonService');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);

app.get('/api/tickers', async (req, res) => {
    try {
        const top50Tickers = await getTop50SP500ByMarketCap();
        res.json(top50Tickers);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tickers' });
    }
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
