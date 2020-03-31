import axios from '../helpers/axios';
import { useReducer, useCallback } from 'react';

const initialState = {
  response: null,
  error: false,
  loading: false
};

const requestReducer = (state, action) => {
  const { type, error, response } = action;
  switch (type) {
    case 'SENDING':
      return { ...state, loading: true, error: null, response: null };
    case 'ERROR':
      return { ...state, loading: false, error };
    case 'RESPONSE':
      return { ...state, response, loading: false, error: null };
    default:
      throw new Error(`Action type unknown: ${action.type}`);
  }
};

const useAxios = (method, url) => {
  const [requestState, dispatch] = useReducer(requestReducer, initialState);
  const { response, error, loading } = requestState;
  const sendRequest = useCallback((data = null) => {
    async function sendRequestAsync() {
      try {
        dispatch({ type: 'SENDING' });
        const token = sessionStorage.getItem(global.accessTokenKey);

        let response;
        switch (method) {
          case 'get':
            response = await axios.get(url, {
              headers: { Authorization: `Bearer ${token}` }
            });
            break;
          case 'post':
            response = await axios.post(
              url,
              data,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            break;
          default:
            break;
        }
        dispatch({ type: 'RESPONSE', response });
      } catch (error) {
        dispatch({ type: 'ERROR', error });
      }
    }
    sendRequestAsync();
  }, [method, url]);

  return { response, error, loading, sendRequest };
};

export default useAxios;
