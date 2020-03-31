import React, { useReducer } from 'react';
import uuid from 'uuid/v1';

const initialState = {
  commands: []
};

const reducer = (state, action) => {
  const {
    type,
    commands,
    command,
    response,
    status
  } = action;
  let commandsAfter = [...state.commands];
  switch (type) {
    case 'ADD': {
      commandsAfter.push({
        id: uuid(),
        command,
        response,
        status
      });
      return { ...state, commands: [...commandsAfter] };
    }
    case 'SET': {
      commandsAfter = [];
      for (var index in commands) {
        const command = commands[index];
        const newCommands = {
          command,
          response,
          status
        };
        commandsAfter.push(newCommands);
      }
      return { ...state, commands: [...commandsAfter] };
    }
    default:
      throw new Error('Unknown action type');
  }
};

const CommandContext = React.createContext();

const CommandContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CommandContext.Provider value={{ state, dispatch }}>
      {children}
    </CommandContext.Provider>
  );
};

export { CommandContext as default, CommandContextProvider };
