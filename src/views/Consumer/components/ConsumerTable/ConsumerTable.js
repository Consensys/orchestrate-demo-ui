import React, { Fragment, useState, useContext } from 'react';
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

import AlertContext from 'context/alert-context';

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

const ConsumerTable = props => {
  const {
    className,
    updated,
    ...rest
  } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [consumerReceipts, setConsumerReceipts] = useState([]);

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
                  <col style={{ width: '60%' }} />
                  <col />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Receipt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consumerReceipts.map((receipt, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        ---
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

ConsumerTable.propTypes = {
  className: PropTypes.string
};

export default ConsumerTable;
