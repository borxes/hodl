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
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.1em',
    },
  },
  dolla: {
    backgroundColor: '#4a148c',
    color: '#eeeeee',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2em',
    },
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
  const losses = Number.parseFloat(athSum - currentSum).toFixed(2);

  return (
    <div>
      {coinSymbol && coinData.status === 'OK' && (
        <div>
          <Typography variant="subtitle1" className={classes.output}>
            <p>
              ${coinSymbol} All Time High was{' '}
              <span className={classes.dolla}>${ath}</span> and you could have
              sold your {amount} coins for{' '}
              <span className={classes.dolla}>${athSum}</span>.
            </p>
            <p>
              Instead you HEDL and now they're worth only{' '}
              <span className={classes.dolla}>${currentSum}</span>.
            </p>
            <p>
              You've lost <span className={classes.dolla}>${losses}</span> to
              the HODL meme.
            </p>
          </Typography>
          <iframe
            title="laughing cowboy"
            src="https://giphy.com/embed/11aitZSSRhHYuQ"
            width="480"
            height="205"
            frameBorder="0"
            className="giphy-embed"
          />
        </div>
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
