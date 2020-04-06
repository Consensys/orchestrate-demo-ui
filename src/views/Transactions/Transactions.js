import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { TransactionsForm, TransactionsToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Transactions = () => {
  const classes = useStyles();

  const [displayForm, setDisplayForm] = useState(false);

  const openForm = id => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Transactions</Typography>
      <TransactionsToolbar openForm={openForm} />
      {displayForm && (
        <div className={classes.content}>
          <TransactionsForm
            closeForm={closeForm}
          />
        </div>
      )}
    </div>
  );
};

export default Transactions;
