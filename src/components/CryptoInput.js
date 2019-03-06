import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fromPairs } from 'lodash';
import AutoComplete from './AutoComplete';
import InputLabel from '@material-ui/core/InputLabel';

async function top100coins() {
  const response = await axios.get('https://api.coinpaprika.com/v1/coins');
  const coins = response.data
    .filter(coin => coin.rank > 0)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 99);
  return coins;
}

const CryptoInput = ({ setCoin, setMenuOpen }) => {
  const [coins, setCoins] = useState({});

  // this is a separate function, as an async function cannot be used inside useEffect
  async function fetchCoins() {
    const top100 = await top100coins();
    setCoins(fromPairs(top100.map(coin => [coin.name, coin.symbol])));
  }

  useEffect(() => {
    fetchCoins();
  }, []); // fetch only on mount

  const options = Object.keys(coins).map(coin => ({
    label: coin,
    value: coins[coin],
  }));
  return (
    <div>
      <AutoComplete
        options={options}
        update={setCoin}
        setMenuState={setMenuOpen}
      />
    </div>
  );
};

export default CryptoInput;
