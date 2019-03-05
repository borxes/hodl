import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

const styles = theme => ({
  output: {
    width: '70%',
    margin: '0 auto',
    marginTop: '2em',
    fontSize: '2em',
    textAlign: 'center',
  },
  dolla: {
    backgroundColor: '#4a148c',
    color: '#eeeeee',
  },
});

function Output({ coinSymbol, amount, classes }) {
  const [coinData, setCoinData] = useState({});

  async function fetchPrice() {
    const priceData = await getPriceData(coinSymbol);
    setCoinData(priceData);
  }

  useEffect(() => {
    fetchPrice();
  }, [coinSymbol, amount]);

  const currentPrice = Number.parseFloat(coinData.current).toFixed(2);
  const ath = Number.parseFloat(coinData.ath).toFixed(2);
  const athSum = Number.parseFloat(ath * amount).toFixed(2);
  const currentSum = Number.parseFloat(currentPrice * amount).toFixed(2);

  return (
    <div>
      {coinSymbol && coinData.status === 'OK' && (
        <Typography variant="subtitle1" className={classes.output}>
          ${coinSymbol} All Time High was{' '}
          <span className={classes.dolla}>{ath}</span>. You could have sold your{' '}
          {amount} coins for <span className={classes.dolla}>${athSum}</span>.
          Instead you HEDL and now it's worth $
          <span className={classes.dolla}>{currentSum}</span>. You've lost{' '}
          <strong>
            <span className={classes.dolla}>
              ${ath * amount - currentPrice * amount}
            </span>
          </strong>{' '}
          to the HODL meme.
        </Typography>
      )}
      {coinSymbol && coinData.status !== 'OK' && (
        <Typography color="error" gutterBottom variant="subtitle1">
          Couldn't find ${coinSymbol} on Messari API: {coinData.status}
        </Typography>
      )}
    </div>
  );
}

Output.propTypes = {
  coinSymbol: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Output);
