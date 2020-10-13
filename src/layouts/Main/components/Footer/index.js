import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '22px',
    width: '100%',
    marginTop: '10px',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        &copy;
        {' '}
        <Link
          component="a"
          href="https://overip.io/"
          target="_blank"
        >
          Overip
        </Link>
        { `. ${(new Date()).getFullYear()}` }
      </Typography>
    </div>
  );
};

export default Footer;
