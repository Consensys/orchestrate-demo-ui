import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  title: {
    color: "#ffffff",
    marginLeft: theme.spacing(4)
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const appName = process.env.REACT_APP_APP_NAME;

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/pegasys-orchestrate-logo.svg"
            width="200"
          />
        </RouterLink>
        <Typography variant="h4" className={classes.title}>
          {appName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
