import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
} from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from 'components/common/CircularProgress';

// redux actions
import { signIn } from 'store/actions/platform';
/* APIs */
// import { getUserById } from './apis/tenants';

import { UserContext } from 'context';

/* Components */
import MainLayout from 'layouts/Main';

const NotFound = lazy(() => import('containers/NotFound'));
const RouteWithLayout = lazy(() => import('components/shared/RouteWithLayout'));
const Authentication = lazy(() => import('containers/Authentication'));

const platformRoutes = [
  {
    route: '/',
    component: lazy(() => import('containers/Dashboard')),
  },
  {
    route: '/create',
    component: lazy(() => import('containers/Dashboard/pages/Create')),
  },
  {
    route: '/not-found',
    component: NotFound,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Routes(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const { signIn: signInFunc } = props;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        signInFunc({user})
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [signInFunc]);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress text="Initializing..." />
      </div>
    );
  }
  let view;
  if (props.platform.user) {
      view = (
        <Suspense fallback={<div className={classes.root}><CircularProgress text="Loading..." /></div>}>
          <Switch>
            {platformRoutes.map((item) => (
              <RouteWithLayout
                exact
                key={item.route}
                path={item.route}
                layout={MainLayout}
                component={item.component}
              />
            ))}
            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      );
  } else {
    view = (
      <Suspense fallback={<div className={classes.root}><CircularProgress text="Initializing" /></div>}>
        <Route path="/signin" component={Authentication} />
        <Redirect to="/signin" />
      </Suspense>
    );
  }

  return (
    <UserContext.Provider value={props.platform.user}>
      {view}
    </UserContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.platform.accessToken,
  platform: state.platform,
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
