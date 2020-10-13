import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { clearError } from 'store/actions/platform';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    backgroundColor: '#E8ECF6',
  },
  shiftContent: {
    paddingLeft: 240,
  },
  shrinkContent: {
    paddingLeft: 50,
  },
  topBarWrapper: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: '24px',
    paddingLeft: '24px',
    paddingRight: '24px',
    backgroundColor: '#E8ECF6',
  },
  contentWrapper: {
    minHeight: 'calc(100vh - 124px)',
  },
}));

const Main = (props) => {
  const { children, platform } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);


  // to globally control the sidebar shrink and open
  const shrinkSidebar = useSelector( state=> state.layout.shrinkSidebar);
  const dispatch = useDispatch();
  const handleShrinkSidebar = () => {
    dispatch({type: 'SHRINK_SIDEBAR', shrink:!shrinkSidebar})
  }

  const handleSidebar = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };



  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  useEffect(() => {
    if (platform.error) {
      props.enqueueSnackbar(platform.error, { variant: 'error' });
      props.clearErrorFunc();
    }
  });

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop && !shrinkSidebar,
        [classes.shrinkContent]: isDesktop && shrinkSidebar
      })}
    >
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        isShrink={isDesktop && shrinkSidebar}
      />
      <div className={classes.topBarWrapper}>
        <Topbar 
          onSidebarOpen={isDesktop ? handleShrinkSidebar : handleSidebar} 
        />
      </div>

      <main className={classes.content}>
        <div className={classes.contentWrapper}>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  platform: state.platform,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrorFunc: () => dispatch(clearError()),
});

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Main));
