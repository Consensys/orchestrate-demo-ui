import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HelpIcon from '@material-ui/icons/Help';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

import { SidebarNav } from './components';
import { NetworkSelector } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();


  const dashboardPages = [
    {
      title: 'Homepage',
      href: '/home',
      icon: <DashboardIcon />
    }
  ];

  const pages = [
    {
      title: 'Accounts',
      href: '/accounts',
      icon: <AccountBalanceWalletIcon />
    },
    {
      title: 'Contracts',
      href: '/contracts',
      icon: <LibraryBooksIcon />
    },
    // {
    //   title: 'Explorer',
    //   href: '/explorer',
    //   icon: <BallotIcon />
    // },
    {
      title: 'Faucets',
      href: '/faucets',
      icon: <LocalGasStationIcon />
    },
    // {
    //   title: 'Logs',
    //   href: '/logs',
    //   icon: <HistoryIcon />
    // }
  ];

  const networkpages = [
    {
      title: 'Networks',
      href: '/networks',
      icon: <DeviceHubIcon />
    }
  ];

  const systemPages = [
    {
      title: 'Help',
      href: '/help',
      icon: <HelpIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          pages={dashboardPages}
        />
        <Divider className={classes.divider} />
        <SidebarNav
          pages={networkpages}
        />
        <NetworkSelector />
        <Divider className={classes.divider} />
        <SidebarNav
          pages={pages}
        />
        <Divider className={classes.divider} />

        <SidebarNav
          pages={systemPages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
