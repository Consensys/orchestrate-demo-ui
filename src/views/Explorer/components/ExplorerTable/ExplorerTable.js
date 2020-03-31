import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';


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

const ExplorerTable = props => {
  const {
    className,
    openForm,
    closeForm,
    ...rest
  } = props;

  const classes = useStyles();


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
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </Fragment>
  );
};

ExplorerTable.propTypes = {
  className: PropTypes.string
};

export default ExplorerTable;
