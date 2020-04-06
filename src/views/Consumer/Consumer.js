import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { ConsumerTable, ConsumerToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Consumer = () => {
  const classes = useStyles();

  const [updated, setUpdated] = useState(new Date());

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
      >Consumer</Typography>
      <ConsumerToolbar
        setUpdated={setUpdated}
      />
      <ConsumerTable
        updated={updated}
        className={classes.table}
      />
    </div>
  );
};

export default Consumer;
