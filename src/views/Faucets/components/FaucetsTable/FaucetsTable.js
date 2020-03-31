import React, { Fragment, useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import useAxios from 'hooks/axios';

import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 450
  },
  button: {
    marginRight: '10px'
  },
  deleted: {
    marginTop: '15px',
    backgroundColor: '#f6f6f6'
  }
}));

const FaucetsTable = props => {
  const {
    className,
    updated,
    ...rest
  } = props;

  const classes = useStyles();

  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(true);
  const [faucets, setFaucets] = useState([]);

  const { response, sendRequest } = useAxios(
    'get',
    '/faucets'
  );
  useEffect(sendRequest, [updated]);

  useEffect(() => {
    setLoading(true);
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
      setFaucets(response.data.response);

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
    <Fragment>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Network</TableCell>
                    <TableCell>Creditor account address</TableCell>
                    <TableCell>Max balance</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Cooldown</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {faucets.map(faucet => (
                    <TableRow key={faucet.uuid}>
                      <TableCell>
                        {faucet.name}
                      </TableCell>
                      <TableCell>
                        {faucet.chainRule}
                      </TableCell>
                      <TableCell>
                        {faucet.maxBalance}
                      </TableCell>
                      <TableCell>
                        {faucet.amount}
                      </TableCell>
                      <TableCell>
                        {faucet.cooldown}
                      </TableCell>
                      <TableCell>
                        {faucet.creditorAccountAddress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {loading && <LinearProgress />}
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </Fragment>
  );
};

FaucetsTable.propTypes = {
  className: PropTypes.string
};

export default FaucetsTable;
