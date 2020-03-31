import React, { useContext, useEffect, useState } from 'react';

import NetworkContext from 'context/network-context';

import { Select, MenuItem, OutlinedInput } from '@material-ui/core';

import { CSSTransition } from 'react-transition-group';

const NetworkSelector = () => {
  const {
    state: { selectedNetwork, networks },
    dispatch: dispatchNetwork
  } = useContext(NetworkContext);

  const networkHandleChange = event => {
    dispatchNetwork({ type: 'SELECT', uuid: event.target.value });
  };

  const [alertDisplay, setAlertDisplay] = useState(false);

  useEffect(() => {
    setAlertDisplay(true);
  }, [networks, selectedNetwork]);

  return (
    <React.Fragment>
      <CSSTransition
        classNames="alert"
        in={alertDisplay}
        onEnter={() => setAlertDisplay(false)}
        onExited={() => setAlertDisplay(false)}
        timeout={500}
      >
        <Select
          input={
            <OutlinedInput
              name="network"
              onChange={networkHandleChange}
              value={selectedNetwork}
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
      </CSSTransition>
    </React.Fragment>
  );
};
export default NetworkSelector;
