import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import investmentRoutes from './routes/investmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import indicatorsRoutes from './routes/indicators.js';
import globalMetricsRoutes from './routes/globalMetrics.js';
import profitLossRoutes from './routes/profitLossRoutes.js';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CMC_API_KEY = process.env.CMC_API_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/investments', investmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/indicators', indicatorsRoutes);
app.use('/api/global-metrics', globalMetricsRoutes);
app.use('/api/profit-loss', profitLossRoutes); 

// Endpoint pour récupérer le Fear and Greed Index
app.get('/api/indicators/fear-and-greed', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
    });
    console.log('CoinMarketCap Response:', response.data); // Pour débogage
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching Fear and Greed Index:', err.message);
    res.status(500).json({ message: 'Failed to fetch Fear and Greed Index' });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });