import React, { useState, useContext, useEffect } from 'react';

import { Snackbar } from '@material-ui/core';

import AlertContext from 'context/alert-context';

import AlertContentWrapper from './components/AlertContentWrapper';

const Alert = () => {
  const [snackbarState, setSnackbarState] = useState(false);

  const {
    state: { message, open, type },
    dispatch: dispatchAlert
  } = useContext(AlertContext);

  useEffect(() => {
    setSnackbarState({ type, open, message });
  }, [type, open, message]);

  const handleCloseAlert = () => {
    setSnackbarState({ ...snackbarState, open: false });
    dispatchAlert({ type: 'CLOSE' });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={5000}
      onClose={handleCloseAlert}
      open={snackbarState.open}
    >
      <AlertContentWrapper
        message={snackbarState.message}
        onClose={handleCloseAlert}
        variant={snackbarState.type}
      />
    </Snackbar>
  );
};

export default Alert;
