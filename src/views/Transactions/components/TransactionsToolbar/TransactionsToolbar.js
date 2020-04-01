import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TransactionsToolbar = props => {
  const { className, openForm, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Button
          color="primary"
          onClick={openForm.bind(this, null)}
          variant="contained"
        >
          <AddIcon className={classes.icon} />
          Create transaction
        </Button>
      </div>
    </div>
  );
};

TransactionsToolbar.propTypes = {
  className: PropTypes.string,
  openForm: PropTypes.func.isRequired
};

export default TransactionsToolbar;
