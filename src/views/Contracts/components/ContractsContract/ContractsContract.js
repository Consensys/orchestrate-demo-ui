import React, { Fragment, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  LinearProgress,
  Typography
} from '@material-ui/core';

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
  content: {
    overflowWrap: "break-word"
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

const ContractsContract = props => {
  const { className, setUpdated, contractName, closeContract, ...rest } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(false);

  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const { response, sendRequest } = useAxios(
    'get',
    `/contracts/${contractName}`
  );
  useEffect(sendRequest, []);

  useEffect(() => {
    setLoading(true);
    console.log(response)
    if (response && response.status === 200) {
      setLoading(false);
      if (!response.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }
      setContract(response.data.response);

      const commands = response.data.commands.length > 0 ? response.data.commands : [];
      commands.forEach(command => {
        dispatchCommand({
          type: 'ADD',
          status: 'success',
          command: command.command,
          response: command.rawResponse
        });
      });
    }
  }, [response, dispatchCommand, dispatchAlert]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Typography
          variant="h4"
        >Contract: {contractName}</Typography>
        <br />
        {!loading &&
          <Fragment>
            <Typography
              variant="body1"
            >
              <strong>Bytecode:</strong> {contract.bytecode}</Typography>
            <br />
            <Typography
              variant="body1"
            >
              <strong>deployedBytecode:</strong> {contract.deployedBytecode}</Typography>
          </Fragment>
        }
      </CardContent>
      <Divider />
      {loading && <LinearProgress />}
      <CardActions>
        <Button
          color="primary"
          onClick={closeContract}
        >
          Close
          </Button>
      </CardActions>
    </Card>
  );
};

ContractsContract.propTypes = {
  className: PropTypes.string
};

export default ContractsContract;
