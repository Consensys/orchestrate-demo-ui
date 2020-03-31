import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {

  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  content: {
    height: '140px'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Features = props => {
  const { className, feature, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Typography
          align="left"
          gutterBottom
          variant="h4"
        >
          {feature.title}
        </Typography>
        <Typography
          align="left"
          variant="body1"
        >
          {feature.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <RouterLink to={feature.href}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            View <ArrowRightIcon />
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
};

Features.propTypes = {
  className: PropTypes.string,
  feature: PropTypes.object.isRequired
};

export default Features;