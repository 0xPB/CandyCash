const axios = require('axios');

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

// Liste des 50 plus grandes entreprises du S&P 500 (exemple, à vérifier et actualiser si nécessaire)
const sp500TopTickers = [
  "AAPL", "MSFT", "AMZN", "GOOGL", "GOOG", "BRK.B", "TSLA", "META", "NVDA", "UNH",
  "JNJ", "V", "XOM", "PG", "JPM", "HD", "MA", "PFE", "CVX", "ABBV",
  "KO", "PEP", "LLY", "MRK", "BAC", "COST", "DIS", "CSCO", "AVGO", "MCD",
  "WMT", "ADBE", "NFLX", "CRM", "VZ", "INTC", "T", "CMCSA", "ACN", "NKE",
  "MDT", "NEE", "HON", "TXN", "UNP", "IBM", "LIN", "QCOM", "LOW", "PM"
];

async function getTop50SP500ByMarketCap() {
  try {
    // Étape : Récupérer les détails financiers des tickers
    const financialsResponse = await axios.get('https://api.polygon.io/v2/aggs/ticker', {
      params: {
        tickers: sp500TopTickers.join(','), // Requête par lot avec les tickers séparés par des virgules
        apiKey: POLYGON_API_KEY,
      },
    });

    const tickersWithMarketCap = financialsResponse.data.results
        .map(ticker => ({
          ticker: ticker.ticker,
          name: ticker.name,
          marketCap: ticker.market_cap || 0,
        }))
        .filter(ticker => ticker.marketCap > 0)
        .sort((a, b) => b.marketCap - a.marketCap);

    // Retourner la liste triée par capitalisation boursière
    return tickersWithMarketCap;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

module.exports = {
  getTop50SP500ByMarketCap,
};
