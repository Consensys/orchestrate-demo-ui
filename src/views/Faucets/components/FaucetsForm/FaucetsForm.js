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
  useFaucetFormInput
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

const FaucetsForm = props => {
  const { className, closeForm, setUpdated, faucets, faucetId, ...rest } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [chainRuleLoading, setChainRuleLoading] = useState(true);
  const [creditorAccounts, setCreditorAccounts] = useState([]);

  const {
    state: { selectedNetwork, networks }
  } = useContext(NetworkContext);
  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const cooldowns = ["10s"];
  const faucetAmounts = ["60000000000000000"];
  const maxBalances = ["100000000000000000"];
  const faucetFormInput = useFaucetFormInput('', '', selectedNetwork, cooldowns[0], faucetAmounts[0], maxBalances[0]);

  const faucetRegisterHandler = () => {
    const name = faucetFormInput.name;
    const creditorAccount = faucetFormInput.creditorAccount;
    const chainRule = faucetFormInput.chainRule;
    const cooldown = faucetFormInput.cooldown;
    const amount = faucetFormInput.amount;
    const maxBalance = faucetFormInput.maxBalance;

    if (name === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet name empty, please add a name.'
      });
      return;
    } else if (creditorAccount === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet creditorAccount empty, please add a creditorAccount.'
      });
      return;
    } else if (chainRule === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet chainRule empty, please add a chainRule.'
      });
      return;
    } else if (cooldown === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet cooldown empty, please add a cooldown.'
      });
      return;
    } else if (amount === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet amount empty, please add a amount.'
      });
      return;
    } else if (maxBalance === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Faucet maxBalance empty, please add a maxBalance.'
      });
      return;
    }

    const data = { name, creditorAccount, chainRule, cooldown, amount, maxBalance }
    sendRequest(data);
    setLoading(true);
  };

  const { response, error, sendRequest } = useAxios(
    'post',
    '/faucets'
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
    setChainRuleLoading(true);
    console.log(accountsResponse);
    if (accountsResponse && accountsResponse.status === 200) {
      setChainRuleLoading(false);
      if (!accountsResponse.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }
      setCreditorAccounts(accountsResponse.data.response);

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
        <CardHeader title="Register Faucet" />
        <CardContent>
          {/* Name */}
          <Grid container>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Faucet name"
                margin="dense"
                name="faucetName"
                onChange={faucetFormInput.onChangeName}
                required
                value={faucetFormInput.value}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* Creditor account */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Creditor account
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className={classes.selectAccount}
            >
              {chainRuleLoading ? <LinearProgress /> :
                <Select
                  className={classes.select}
                  input={
                    <OutlinedInput
                      name="faucetCreditorAccount"
                      onChange={faucetFormInput.onChangeCreditorAccount}
                      value={faucetFormInput.creditorAccount}
                    />
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  {creditorAccounts.map(creditorAccount => (
                    <MenuItem
                      key={creditorAccount}
                      value={creditorAccount}
                    >
                      {creditorAccount}
                    </MenuItem>
                  ))}
                </Select>
              }
            </Grid>
          </Grid>
          {/* Faucet network */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Faucet network
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
                    name="faucetChainRule"
                    onChange={faucetFormInput.onChangeChainRule}
                    value={faucetFormInput.chainRule}
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
          {/* Faucet cooldown */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Faucet cooldown
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
                    name="faucetCooldown"
                    onChange={faucetFormInput.onChangeCooldown}
                    value={cooldowns[0]}
                  />
                }
              >
                <MenuItem value="">None</MenuItem>
                {cooldowns.map(cooldown => (
                  <MenuItem
                    key={cooldown}
                    value={cooldown}
                  >
                    {cooldown}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {/* Faucet amount */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Faucet amount
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
                    name="faucetAmount"
                    onChange={faucetFormInput.onChangeAmount}
                    value={faucetAmounts[0]}
                  />
                }
              >
                <MenuItem value="">None</MenuItem>
                {faucetAmounts.map(faucetAmount => (
                  <MenuItem
                    key={faucetAmount}
                    value={faucetAmount}
                  >
                    {faucetAmount}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {/* Faucet max balance */}
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                Faucet max balance
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
                    name="faucetMaxBalance"
                    onChange={faucetFormInput.onChangeMaxBalance}
                    value={maxBalances[0]}
                  />
                }
              >
                <MenuItem value="">None</MenuItem>
                {maxBalances.map(maxBalance => (
                  <MenuItem
                    key={maxBalance}
                    value={maxBalance}
                  >
                    {maxBalance}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {loading ? <CircularProgress /> : <Button
            color="primary"
            onClick={faucetRegisterHandler}
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

FaucetsForm.propTypes = {
  className: PropTypes.string,
  closeForm: PropTypes.func.isRequired
};

export default FaucetsForm;
