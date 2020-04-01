import React, { useReducer } from 'react';

const initialState = {
  selectedNetwork: '',
  networks: []
};

const reducer = (state, action) => {
  const {
    type,
    networks,
    uuid,
    name,
    urls
  } = action;
  let networksAfter = [...state.networks];
  switch (type) {
    case 'ADD': {
      networksAfter.push({
        id: uuid,
        name,
        urls
      });
      return { ...state, networks: [...networksAfter] };
    }
    case 'SET': {
      networksAfter = [];
      for (var index in networks) {
        const network = networks[index];
        const newNetworks = {
          id: network.uuid,
          name: network.name,
          urls: network.urls,
        };
        networksAfter.push(newNetworks);
      }
      return { ...state, networks: [...networksAfter] };
    }
    case 'SELECT':
      return { ...state, selectedNetwork: uuid };
    default:
      throw new Error(`Unknown action type: $(type)`);
  }
};

const NetworkContext = React.createContext();

const NetworkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NetworkContext.Provider value={{ state, dispatch }}>
      {children}
    </NetworkContext.Provider>
  );
};

export { NetworkContext as default, NetworkContextProvider };
