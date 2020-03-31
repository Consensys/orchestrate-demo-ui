import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { AccountsTable, AccountsToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Accounts = () => {
  const classes = useStyles();

  const [updated, setUpdated] = useState(new Date());

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
      >Accounts</Typography>
      <AccountsToolbar
        setUpdated={setUpdated}
      />
      <AccountsTable
        updated={updated}
        className={classes.table}
      />
    </div>
  );
};

export default Accounts;
