import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  CircularProgress
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import useAxios from 'hooks/axios';

import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const AccountsToolbar = props => {
  const { className, setUpdated, ...rest } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const accountCreateHandler = networkId => {
    setLoading(true);
    sendRequest();
  };

  const { response, error, sendRequest } = useAxios(
    'post',
    '/accounts'
  );

  useEffect(() => {
    if (response && response.status === 201) {
      setLoading(false);
      if (!response.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }
      const commands = response.data.commands.length > 0 ? response.data.commands : [];
      commands.forEach(command => {
        dispatchCommand({
          type: 'ADD',
          status: 'success',
          command: command.command,
          response: command.response
        });
      });
      dispatchAlert({
        type: 'SUCCESS',
        message: `Account created`
      });
      setUpdated(new Date());
    } else if (error) {
      setLoading(false);
      // Error
      dispatchAlert({
        type: 'ERROR',
        message: `${error.message}: ${error.config.baseURL}${error.config.url}`
      });
    }
  }, [response, error, setUpdated, dispatchCommand, dispatchAlert]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        {loading ? <CircularProgress /> :
          <Button color="primary" onClick={accountCreateHandler} variant="contained">
            <AddIcon className={classes.icon} />
            Create account
          </Button>
        }
      </div>
    </div>
  );
};

AccountsToolbar.propTypes = {
  className: PropTypes.string
};

export default AccountsToolbar;
