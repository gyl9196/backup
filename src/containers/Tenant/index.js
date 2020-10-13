import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import moment from 'moment-timezone';

// formik
import { Formik } from 'formik';
import * as Yup from 'yup';

// apis
import * as tenants from 'apis/tenants';
import * as users from 'apis/tenant-users';
import CustomButton from 'components/common/CustomButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const CompleteSignup = (props) => {
  const classes = useStyles();

  const { user } = props;

  const createTenantFunc = (tenantname, setSubmitting) => {
    setSubmitting(true);
    tenants.create({ tenantName: tenantname })
      .then((resp) => {
        if (resp.status === 200 && resp.data.tenantId) {
          Auth.currentAuthenticatedUser().then((u) => {
            Auth.updateUserAttributes(u, { 'custom:tenantId': resp.data.tenantId })
              .then((re) => {
                if (re === 'SUCCESS') {
                  users.create(resp.data.tenantId, {
                    userId: u.username,
                    userName: user.username,
                    userEmail: user.attributes.email,
                    timezone: moment.tz.guess(),
                    datetimeFormat: '%d %b %Y %r',
                  })
                    .then((r) => {
                      if (r.status === 200) {
                        window.location.href = '/';
                      }
                    })
                    .finally(() => setSubmitting(false));
                }
              });
          });
        }
      });
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <Card>
            <Formik
              initialValues={{ tenantname: '' }}
              onSubmit={(values, { setSubmitting }) => {
                createTenantFunc(values.tenantname, setSubmitting);
              }}
              validationSchema={Yup.object().shape({
                tenantname: Yup.string().required('Required'),
              })}
            >
              {(p) => {
                const {
                  values,
                  touched,
                  errors,
                  // dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  // handleReset,
                } = p;
                return (
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <CardHeader
                      title="Complete Signup"
                      subheader="Please enter your company name"
                    />
                    <Divider />
                    <CardContent>
                      <TextField
                        margin="dense"
                        id="tenantname"
                        label="Company name"
                        type="text"
                        name="tenantname"
                        value={values.tenantname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={errors.tenantname && touched.tenantname}
                        helperText={errors.tenantname}
                      />
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.cardAction}>
                      <CustomButton
                        fullWidth
                        title="Create"
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                        variant="contained"
                        loading={isSubmitting}
                      />
                    </CardActions>
                  </form>
                );
              }}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.platform.user,
});

export default connect(mapStateToProps)(CompleteSignup);
