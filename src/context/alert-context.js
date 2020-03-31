import React, { useReducer } from 'react';

const initialState = {
  alerts: {},
  type: null,
  open: false,
  message: null
};

const AlertContext = React.createContext();

const reducer = (state, action) => {
  const { type, message } = action;

  switch (type) {
    case 'SUCCESS': {
      return { ...state, type: 'success', open: true, message };
    }
    case 'INFO': {
      return { ...state, type: 'info', open: true, message };
    }
    case 'WARNING': {
      return { ...state, type: 'warning', open: true, message };
    }
    case 'ERROR': {
      return { ...state, type: 'error', open: true, message };
    }
    case 'CLOSE': {
      return { ...state, open: false, message: null };
    }
    default:
      throw new Error(`Unkwown action type: ${type}`);
  }
};

const AlertContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext as default, AlertContextProvider };
