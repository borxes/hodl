import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  amount: {
    marginTop: theme.spacing.unit * -15,
  },
});

const Amount = ({ classes, update, symbol }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    update(amount);
  }, [amount]);

  return (
    <div className={classes.amount}>
      <Typography variant="subtitle1" gutterBottom>
        How many ${symbol} did you hodl?
      </Typography>
      <TextField
        id="outlined-number"
        label="Amount"
        value={amount}
        onChange={e => {
          setAmount(e.target.value);
        }}
        type="number"
        className={classes ? classes.textField : ''}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

Amount.propTypes = {
  classes: PropTypes.object,
  update: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default withStyles(styles)(Amount);
