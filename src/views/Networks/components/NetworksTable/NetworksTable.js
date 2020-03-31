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

import Moment from "react-moment";

import useAxios from 'hooks/axios';

import NetworkContext from 'context/network-context';
import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 450
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  chip: {
    marginRight: '10px'
  },
  actions: {
    justifyContent: 'flex-end',
    lineHeight: '42px',
    width: '30%'
  },
  button: {
    marginRight: '10px'
  },
  deleted: {
    marginTop: '15px',
    backgroundColor: '#f6f6f6'
  }
}));

const NetworksTable = props => {
  const {
    className,
    updated,
    ...rest
  } = props;

  const classes = useStyles();

  const { dispatch: dispatchNetwork } = useContext(NetworkContext);
  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(true);
  const [networks, setNetworks] = useState([]);

  const { response, sendRequest } = useAxios(
    'get',
    '/networks'
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

      const networks = response.data.response;
      setNetworks(networks);
      dispatchNetwork({
        type: 'SET',
        networks
      });

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
  }, [response, dispatchNetwork, dispatchCommand, dispatchAlert]);

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
                  <col />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Urls</TableCell>
                    <TableCell>Listener enable</TableCell>
                    <TableCell>Current block</TableCell>
                    <TableCell>Starting block</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Updated at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {networks.map(network => (
                    <TableRow key={network.uuid}>
                      <TableCell>
                        {network.name}
                      </TableCell>
                      <TableCell>
                        {network.urls.map((url, index) => <div key={index}>{url}</div>)}
                      </TableCell>
                      <TableCell>
                        {network.listenerExternalTxEnabled ? <DoneIcon /> : <ClearIcon />}
                      </TableCell>
                      <TableCell>
                        {network.listenerCurrentBlock}
                      </TableCell>
                      <TableCell>
                        {network.listenerStartingBlock}
                      </TableCell>
                      <TableCell>
                        <Moment
                          date={network.createdAt}
                          format="ddd, MMM DD, YYYY, HH:mm:ss"
                        />
                      </TableCell>
                      <TableCell>
                        <Moment
                          date={network.updatedAt}
                          format="ddd, MMM DD, YYYY, HH:mm:ss"
                        />
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

NetworksTable.propTypes = {
  className: PropTypes.string
};

export default NetworksTable;
