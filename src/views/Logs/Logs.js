import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { LogsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Logs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Logs</Typography>
      <LogsTable
        className={classes.table}
      />
    </div>
  );
};

export default Logs;
