/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  List, ListItem, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: 'none',
    padding: '1px',
    marginTop: '20px'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: '#273458'
    }
  },
  test: {
    width: '100%',
    backgroundColor: 'white',
    opacity: 0.2
  },
  button: {
    color: '#cfd8dc',
    padding: '10px 1px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0.5,
    width: '100%',
    fontWeight: 400,
  },
  icon: {
    width: 24,
    height: 24,
    color: '#cfd8dc',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  active: {
    color: 'white',
    letterSpacing: 0.5,
    fontWeight: 400,
    '& $icon': {
      color: '#2DCED6',
    },
    borderRadius: 0,
    borderLeft: '2px solid #2DCED6',
    backgroundColor: '#273458',

  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, ...rest } = props;

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={classes.root}
    >
      {pages.map((page) => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            exact={page.exact}
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
