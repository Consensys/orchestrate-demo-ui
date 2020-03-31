import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import { Features } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  jumbo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  jumboText: {
    fontSize: '18px'
  },
  titleFeature: {
    marginBottom: theme.spacing(1),
  }
}));

const Homepage = () => {
  const classes = useStyles();

  const features = [
    {
      title: "TRANSACTION MANAGEMENT",
      description: "Handle end to end blockchain transaction requirements and ensure reliable performance (from gas & none management to transaction signing, sending, transaction listening & receipt decoding).",
      href: "/explorer"
    },
    {
      title: "PRIVATE KEYE STORAGE",
      description: "Increase security by ensuring key management operations are handled independently using enterprise grade vaults.",
      href: "/accounts"
    },
    {
      title: "SMART CONTRACT MANAGEMENT",
      description: "Keep your Smart Contracts secure and easily accessible within a registry. Run automated security audits using MythX.",
      href: "/contracts"
    },
    {
      title: "ACCOUNT MANAGEMENT",
      description: "Use business identifiers to manange blockchain accounts and control access with ease.",
      href: "/accounts"
    },
    {
      title: "FAUCET MANAGEMENT",
      description: "Activate accounts and pre-fund them with Ether to ensure functionality",
      href: "/faucet"
    },
    {
      title: "PRIVACY",
      description: "Multiple privacy infrastructures, no double-spend, privacy groups in API.",
      href: "/accounts"
    }
  ]

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        Orchestrate
      </Typography>

      <Card
        className={classes.jumbo}
      >
        <CardContent className={classes.content}>
          <Typography variant="body1" component="h2" gutterBottom className={classes.jumboText}>
            <strong>PegaSys Orchestrate</strong> is the glue that connects your platform to Ethereum blockchain networks.<br />
            <br />
            Build blockchain powered applications with speed and ease using the most advanced orchestration solution.
      </Typography>
        </CardContent>
      </Card>

      <Typography variant="h3" component="h2" gutterBottom className={classes.titleFeature}>
        Features
      </Typography>
      <Grid
        container
        spacing={4}
      >
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            lg={4}
            md={6}
            xs={12}
          >
            <Features feature={feature} />
          </Grid>
        ))}

      </Grid>
    </div>
  );
};

export default Homepage;
