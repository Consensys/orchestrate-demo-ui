import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { NetworksForm, NetworksTable, NetworksToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Networks = () => {
  const classes = useStyles();

  const [displayForm, setDisplayForm] = useState(false);
  const [updated, setUpdated] = useState(new Date());

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
      <Typography variant="h1">Networks</Typography>
      <NetworksToolbar openForm={openForm} />
      {displayForm && (
        <div className={classes.content}>
          <NetworksForm
            closeForm={closeForm}
            setUpdated={setUpdated}
          />
        </div>
      )}
      <NetworksTable
        updated={updated}
        className={classes.table}
      />
    </div>
  );
};

export default Networks;
