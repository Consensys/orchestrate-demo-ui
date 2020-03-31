import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { ExplorerTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  table: {
    marginTop: theme.spacing(2)
  }
}));

const Explorer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Explorer</Typography>
      <ExplorerTable
        className={classes.table}
      />
    </div>
  );
};

export default Explorer;
