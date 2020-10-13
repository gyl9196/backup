import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, colors } from '@material-ui/core';

import { UserContext } from 'context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '64px',
    backgroundColor: theme.palette.darkGrey,
    // marginTop: 10,
    // marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    color: colors.blueGrey[100],
  },
  bio: {
    color: colors.blueGrey[300],
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <div
      {...rest}
      className={classes.root}
    >
      <Typography
        className={classes.name}
        variant="h5"
      >
        {user.userEmail}
      </Typography>
    </div>
  );
};

export default Profile;
