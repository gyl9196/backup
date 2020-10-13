import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar, Toolbar, IconButton, colors,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  InputAdornment, 
  TextField, 
  MenuItem, 
  MenuList, 
  Popper, 
  Grow, 
  Paper, 
  ClickAwayListener,
  Avatar
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Auth } from 'aws-amplify';
import { signOut } from 'store/actions/platform';
import { UserContext } from 'context';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.02)',
    position: 'static',
    backgroundColor: theme.palette.white,
    color: colors.grey[600],
    padding: '0'
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: '12px'
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    backgroundColor: '#1077E5',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, signOutFunc, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory();
  const user = useContext(UserContext);

  const classes = useStyles();

  const handleSignOut = () => {
    Auth.signOut().then(() => {
      signOutFunc();
    }).catch((e) => {
      console.log(e);
    });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleProfile() {
    history.push('/account')
    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={onSidebarOpen}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.flexGrow}>
        <TextField
          fullWidth
          placeholder="Search…"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon style={{ color: '#B2B8C7'}} fontSize="small"/>
                </InputAdornment>
              )
            }}
        />
        </div>
          {/* Todo: the detail function */}
          <IconButton
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
        
        {/* Todo: the detail function */}
          <IconButton
            color="inherit"
          >
            <NotificationIcon />
          </IconButton>

          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar className={classes.avatar}>{user.attributes.email.slice(0,2)}</Avatar>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>

          <Popper style={{zIndex: 2}} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

const mapDispatchToProps = {
  signOutFunc: signOut,
};

export default connect(null, mapDispatchToProps)(Topbar);
