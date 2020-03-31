import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core';


import CommandContext from 'context/command-context';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4)
  },
  title: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  textarea: {
    width: "100%",
    minWidth: "100%",
    maxWidth: "100%",
    color: "#ffffff",
    backgroundColor: "#1e1e1e",
    height: "400px",
    overflowY: "auto",
    padding: "5px"
  },
  text: {
    color: "#ffffff"
  },
  textSuccess: {
    color: "#ffffff"
  },
  textCommand: {
    color: "#ffffff"
  },
  textResponse: {
    color: "#23d16f"
  },
}));

const Commands = props => {
  const { className } = props;

  const classes = useStyles();

  const {
    state: { commands }
  } = useContext(CommandContext);

  function formatCommand(commands) {
    let formatedCommand;

    if (typeof commands === 'string' || Array.isArray(commands)) {
      formatedCommand = commands.split("\n").map((command, index) => {
        return <span key={index}>
          {command}<br />
        </span>;
      });
    } else {
      formatedCommand = JSON.stringify(commands);
    }
    return formatedCommand;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <Typography className={classes.title} variant="h5" component="h2">
        Commands history
      </Typography>
      <CardContent className={classes.content}>
        <div className={classes.textarea}>
          <Typography
            variant="subtitle2"
          >
            {commands.map(command => (
              <span
                className={classes.textCommand}
                key={command.id}
              >
                > {command.command}<br />
                <span className={classes.textResponse}>
                  &nbsp;&nbsp;{formatCommand(command.response)}
                </span><br />
              </span>
            ))}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};



export default Commands;
