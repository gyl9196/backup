import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
// import DevicesIcon from '@material-ui/icons/Devices';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import SettingsIcon from '@material-ui/icons/Settings';

// import Profile from './components/Profile';
import SidebarNav from './components/SidebarNav';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
  },
  drawerShrink: {
      width: 55,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [theme.breakpoints.up('lg')]: {
        height: '100%',
    },
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  root: {
    backgroundColor: '#1D2E54',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    minHeight: '64px',
    backgroundColor: 'white',
    paddingLeft: '10px,'
  },
  logo: {
    maxWidth: 200,
  },
}));

const Sidebar = (props) => {
  const {
    open, variant, onClose, isShrink, ...rest
  } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/',
      exact: true,
      icon: <DashboardIcon />,
    },
    // {
    //   title: 'Integration',
    //   href: '/integration',
    //   exact: false,
    //   icon: <AllInclusiveIcon />,
    // },
    // {
    //   title: 'Inventory',
    //   href: '/inventory',
    //   exact: true,
    //   icon: <DevicesIcon />,
    // },
    // {
    //   title: 'State Capture',
    //   href: '/state-capture',
    //   exact: false,
    //   icon: <PhotoCameraIcon />,
    // },
    {
      title: 'Users',
      href: '/users',
      exact: true,
      icon: <PeopleIcon />,
    },
    {
      title: 'Account',
      href: '/account',
      exact: true,
      icon: <AccountBoxIcon />,
    },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />,
    // },
  ];

  return (
    <Drawer
      anchor="left"
      classes={isShrink ? {paper:classes.drawerShrink}:{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={classes.root}
      >
        {/* <Profile /> */}
        <div className={classes.logoWrapper}>
        <RouterLink to="/" style={{ display: 'flex', paddingLeft: 8 }}>
          
          <img
            className={classes.logo}
            alt="Logo"
            src={require('assets/images/overip_logo.png')}
          />
        </RouterLink>
        </div>     
        <SidebarNav
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
