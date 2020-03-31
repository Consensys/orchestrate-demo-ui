import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { ContractsContract, ContractsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    marginTop: theme.spacing(2)
  }
}));

const Contracts = () => {
  const classes = useStyles();

  // const [updated, setUpdated] = useState(new Date());
  const [contractName, setContractName] = useState(null);

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
      >Contracts</Typography>
      {contractName && <ContractsContract contractName={contractName}
        className={classes.card} />}
      <ContractsTable
        // updated={updated}
        setContractName={setContractName}
        className={classes.card}
      />
    </div>
  );
};

export default Contracts;
