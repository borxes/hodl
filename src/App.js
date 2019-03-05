import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './WithRoot';

import CryptoInput from './components/CryptoInput';
import Amount from './components/Amount';
import Output from './components/Output';

import './App.css';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
});

const App = ({ classes }) => {
  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom>
        HODL They Said...
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Let's see the costs
      </Typography>
      <CryptoInput setCoin={setCoin} setMenuOpen={setMenuOpen} />
      {coin && !menuOpen && (
        <div>
          <Amount update={setAmount} symbol={coin} />
        </div>
      )}
      {coin && Number(amount) !== 0 && (
        <Output coinSymbol={coin} amount={amount} />
      )}
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          HODL They Said... (c)2019
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Made by <a href="https://twitter.com/yurasherman">@yurasherman</a>.
          View <a href="https://github.com/borxes/hodl"> source code </a>.
        </Typography>
      </footer>
      {/* End footer */}
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
