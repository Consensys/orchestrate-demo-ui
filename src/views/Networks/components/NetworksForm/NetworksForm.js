import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import useAxios from 'hooks/axios';

import CommandContext from 'context/command-context';
import AlertContext from 'context/alert-context';

import {
  useNetworkFormInput
} from 'hooks/forms';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  urlsTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0)
  },
  emptyText: {
    margin: theme.spacing(1)
  }
}));

const NetworksForm = props => {
  const { className, closeForm, setUpdated, networks, networkId, ...rest } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { dispatch: dispatchCommand } = useContext(CommandContext);
  const { dispatch: dispatchAlert } = useContext(AlertContext);

  const networkFormInput = useNetworkFormInput();

  const networkRegisterHandler = networkId => {
    const name = networkFormInput.name;
    if (name === '') {
      dispatchAlert({
        type: 'ERROR',
        message: 'Network name empty, please add a name.'
      });
      return;
    }
    const urls = networkFormInput.urls;
    if (urls.length === 0) {
      dispatchAlert({
        type: 'ERROR',
        message: 'Network urls empty, please add a least one url.'
      });
      return;
    }
    const data = { name, urls }
    sendRequest(data);
    setLoading(true);
  };

  const { response, error, sendRequest } = useAxios(
    'post',
    '/networks'
  );

  useEffect(() => {
    if (response && response.status === 201) {
      setLoading(false);
      if (!response.data.commands) {
        // Error
        dispatchAlert({
          type: 'ERROR',
          message: `Invalid Api response`
        });
        return;
      }

      const commands = response.data.commands.length > 0 ? response.data.commands : [];
      commands.forEach(command => {
        dispatchCommand({
          type: 'ADD',
          status: 'success',
          command: command.command,
          response: command.response
        });
      });
      dispatchAlert({
        type: 'SUCCESS',
        message: `Account created`
      });
      setUpdated(new Date());
    } else if (error) {
      setLoading(false);
      // Error
      dispatchAlert({
        type: 'ERROR',
        message: `${error.message}: ${error.config.baseURL}${error.config.url}`
      });
    }
  }, [response, error, dispatchCommand, dispatchAlert, setUpdated]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader title="Register Network" />
        <CardContent>
          <Grid container>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Network name"
                margin="dense"
                name="networkName"
                onChange={networkFormInput.onChangeName}
                required
                value={networkFormInput.value}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography className={classes.urlsTitle} variant="subtitle1">
                Network Urls *
              </Typography>
              {networkFormInput.urls.length > 0 ?
                <List dense={true}>
                  {networkFormInput.urls.map((url, index) => (
                    <ListItem key={index}>
                      <Typography variant="body2">
                        {index + 1}. {url}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                :
                <Typography variant="body2" className={classes.emptyText}>
                  <i>Urls list empty</i>
                </Typography>
              }
            </Grid>
            <Grid
              item
              md={5}
              xs={12}
            >
              <TextField
                fullWidth
                label="Network url"
                margin="dense"
                name="networkName"
                onChange={networkFormInput.onChangeUrl}
                value={networkFormInput.url}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Button
                className={classes.addButton}
                color="primary"
                onClick={networkFormInput.onClickUrls}
                variant="outlined"
              >
                <AddIcon />
                Add url
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {loading ? <CircularProgress /> :
            <Button
              color="primary"
              onClick={networkRegisterHandler.bind(this, networkId)}
              variant="outlined"
            >
              Register
          </Button>
          }
          <Button
            color="primary"
            onClick={closeForm}
          >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

NetworksForm.propTypes = {
  className: PropTypes.string,
  closeForm: PropTypes.func.isRequired
};

export default NetworksForm;
