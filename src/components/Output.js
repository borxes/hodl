import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function getPriceData(coinSymbol) {
  console.log(`output: symbol=${coinSymbol}`);
  if (!coinSymbol)
    return {
      status: 'waiting',
    };
  try {
    const response = await axios.get(
      `https://data.messari.io/api/v1/assets/${coinSymbol.toLowerCase()}/metrics`
    );
    return {
      current: response.data.data.market_data.price_usd,
      ath: response.data.data.all_time_high.price,
      status: 'OK',
    };
  } catch (err) {
    console.log(err);
    return {
      status: err.response.statusText,
    };
  }
}

export default function Output({ coinSymbol, amount }) {
  const [coinData, setCoinData] = useState({});

  async function fetchPrice() {
    const priceData = await getPriceData(coinSymbol);
    setCoinData(priceData);
  }

  useEffect(() => {
    fetchPrice();
  }, [coinSymbol, amount]);

  return (
    <div>
      {coinSymbol && coinData.status === 'OK' && (
        <div className="output">
          <p>
            Current price of ${coinSymbol} is $
            {Number.parseFloat(coinData.current).toFixed(2)}
          </p>
          <p>
            All time high price of ${coinSymbol} is ${coinData.ath}
          </p>
        </div>
      )}
      {coinSymbol && coinData.status !== 'OK' && (
        <div className="error">
          <p>
            Couldn't find ${coinSymbol} on Messari API: {coinData.status}
          </p>
        </div>
      )}
    </div>
  );
}
