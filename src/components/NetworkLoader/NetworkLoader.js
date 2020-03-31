import React, { Fragment, useContext, useEffect } from 'react';

import useAxios from 'hooks/axios';

import NetworkContext from 'context/network-context';
import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';


const NetworkLoader = () => {
  const { dispatch: dispatchNetwork } = useContext(NetworkContext);
  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const { response, error, sendRequest } = useAxios(
    'get',
    '/networks'
  );
  useEffect(sendRequest, []);

  useEffect(() => {
    if (response && response.status === 200) {
      if (!response.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }

      const networks = response.data.response;
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
  }, [
    response,
    dispatchAlert,
    dispatchNetwork,
    dispatchCommand
  ]);

  useEffect(() => {
    if (error) {
      dispatchAlert({
        type: 'ERROR',
        message: 'Networks import error'
      });
    }
  }, [error, dispatchAlert]);

  return <Fragment />;
};

export default NetworkLoader;
