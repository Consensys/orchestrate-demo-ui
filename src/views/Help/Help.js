import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Help = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Help</Typography>
    </div>
  );
};

export default Help;
