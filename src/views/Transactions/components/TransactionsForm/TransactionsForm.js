import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import useAxios from 'hooks/axios';

import NetworkContext from 'context/network-context';
import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';

import {
  useTransactionFormInput
} from 'hooks/forms';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  urlsTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0)
  },
  emptyText: {
    margin: theme.spacing(1)
  },
  select: {
    width: '100%'
  },
  selectAccount: {
    minHeight: '52px'
  }
}));

const TransactionsForm = props => {
  const { className, closeForm, setUpdated, transactions, transactionId, ...rest } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [fromLoading, setFromLoading] = useState(true);
  const [toLoading, setToLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  const {
    state: { selectedNetwork, networks }
  } = useContext(NetworkContext);
  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const transactionFormInput = useTransactionFormInput(selectedNetwork);

  const transactionRegisterHandler = () => {
    const chainId = transactionFormInput.chainId;
    const from = transactionFormInput.from;
    const to = transactionFormInput.to;
    const increment = transactionFormInput.increment;

    if (chainId === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Transaction chain empty, please select a chain.'
      });
      return;
    } else if (from === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Transaction from empty, please select a from.'
      });
      return;
    } else if (to === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Transaction to empty, please select a to.'
      });
      return;
    } else if (increment === 0) {
      dispatchAlert({
        type: 'ERROR',
        message: 'Transaction increment empty, please add a increment.'
      });
      return;
    }
    const data = { chain: chainId, from, to, increment }
    sendRequest(data);
    setLoading(true);
  };

  const { response, error, sendRequest } = useAxios(
    'post',
    '/transactions'
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
  }, [response, error, dispatchCommand, dispatchAlert, setUpdated]);


  const { response: accountsResponse, sendRequest: sendAccountsRequest } = useAxios(
    'get',
    '/accounts'
  );
  useEffect(sendAccountsRequest, []);

  useEffect(() => {
    setFromLoading(true);
    console.log(accountsResponse);
    if (accountsResponse && accountsResponse.status === 200) {
      setFromLoading(false);
      if (!accountsResponse.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }
      setAccounts(accountsResponse.data.response);

      const commands = accountsResponse.data.commands.length > 0 ? accountsResponse.data.commands : [];
      commands.forEach(command => {
        dispatchCommand({
          type: 'ADD',
          status: 'success',
          command: command.command,
          response: command.rawResponse
        });
      });
    }
  }, [accountsResponse, dispatchCommand, dispatchAlert]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader title="Register Transaction" />
        <CardContent>
          {/* Transaction network */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Transaction network
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <Select
                className={classes.select}
                input={
                  <OutlinedInput
                    name="transactionChainRule"
                    onChange={transactionFormInput.onChangeChainId}
                    value={transactionFormInput.chainId}
                  />
                }
              >
                <MenuItem value="">None</MenuItem>
                {networks.map(network => (
                  <MenuItem
                    key={network.id}
                    value={network.id}
                  >
                    {network.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {/* From account */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                From account
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className={classes.selectAccount}
            >
              {fromLoading ? <LinearProgress /> :
                <Select
                  className={classes.select}
                  input={
                    <OutlinedInput
                      name="transactionFrom"
                      onChange={transactionFormInput.onChangeFrom}
                      value={transactionFormInput.from}
                    />
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  {accounts.map(account => (
                    <MenuItem
                      key={account}
                      value={account}
                    >
                      {account}
                    </MenuItem>
                  ))}
                </Select>
              }
            </Grid>
          </Grid>
          {/* To account */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                To account
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className={classes.selectAccount}
            >
              {toLoading ? <LinearProgress /> :
                <Select
                  className={classes.select}
                  input={
                    <OutlinedInput
                      name="transactionTo"
                      onChange={transactionFormInput.onChangeTo}
                      value={transactionFormInput.to}
                    />
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  {accounts.map(account => (
                    <MenuItem
                      key={account}
                      value={account}
                    >
                      {account}
                    </MenuItem>
                  ))}
                </Select>
              }
            </Grid>
          </Grid>
          {/* Increment */}
          <Grid container>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Increment value"
                margin="dense"
                name="transactionIncrement"
                onChange={transactionFormInput.onChangeIncrement}
                required
                value={transactionFormInput.increment}
                variant="outlined"
              />
            </Grid>
          </Grid>

        </CardContent>
        <Divider />
        <CardActions>
          {loading ? <CircularProgress /> : <Button
            color="primary"
            onClick={transactionRegisterHandler}
            variant="outlined"
          >
            Create
          </Button>}
          <Button
            color="primary"
            onClick={closeForm}
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

TransactionsForm.propTypes = {
  className: PropTypes.string,
  closeForm: PropTypes.func.isRequired
};

export default TransactionsForm;
