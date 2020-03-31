import React, { Fragment, useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button, Card,
  CardContent,
  Link,
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
  link: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}));

const ContractsTable = props => {
  const {
    className,
    updated,
    setContractName,
    ...rest
  } = props;

  const classes = useStyles();

  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);

  const contractSelectHandler = contractName => {
    setContractName(contractName);
  };

  const { response, sendRequest } = useAxios(
    'get',
    '/contracts'
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
      setContracts(response.data.response);

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
                  <col style={{ width: '80px' }} />
                  <col />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contracts.map((contract, index) => (
                    <TableRow key={index}>
                      <TableCell >
                        <Link className={classes.link} onClick={contractSelectHandler.bind(this, contract)}>
                          {contract}
                        </Link>
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

ContractsTable.propTypes = {
  className: PropTypes.string
};

export default ContractsTable;
