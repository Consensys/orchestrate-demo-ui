import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { NetworkLoader } from 'components';
import { Sidebar, Topbar, Footer } from './components';
import { Commands } from 'components';

import Alert from 'components/Alert';


import { NetworkContextProvider } from 'context/network-context';
import { CommandContextProvider } from 'context/command-context';
import { AlertContextProvider } from 'context/alert-context';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    minHeight: "calc(100vh - 114px)"
  },
  footer: {
    height: "50px",
    backgroundColor: "#20b2aa"
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  // Alerts
  const [snackbarState, setSnackbarState] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >

      <NetworkContextProvider>
        <CommandContextProvider>
          <AlertContextProvider>
            <NetworkLoader />
            <Alert
              handleCloseSnackbar={handleSnackbarClose}
              snackbarState={snackbarState}
            />
            <Topbar onSidebarOpen={handleSidebarOpen} />
            <Sidebar
              onClose={handleSidebarClose}
              open={shouldOpenSidebar}
              variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main>
              <div className={classes.content}>
                {children}
                <Commands />
              </div>
              <Footer className={classes.footer} />
            </main>

          </AlertContextProvider>
        </CommandContextProvider>
      </NetworkContextProvider>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
