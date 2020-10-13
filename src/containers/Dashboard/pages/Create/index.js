import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, TextField, Snackbar } from '@material-ui/core';
import { createSite } from 'apis/site';
import CustomButton from 'components/common/CustomButton';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

const Create = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper style={{ height: '100%', padding: '10px' }}>
        <Formik
          enableReinitialize
          initialValues={{
            requester: '',
            poSoNumber: '',
            siteId: '',
            siteName: '',
            addressLine_1: '',
            addressLine_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            lanIpOctet_1: '',
            lanIpOctet_2: '',
            lanIpOctet_3: '',
            oobIpOctet_1: '',
            oobIpOctet_2: '',
            oobIpOctet_3: '',
            wanIpOctet_1: '',
            wanIpOctet_2: '',
            wanIpOctet_3: '',
          }}
          validationSchema={Yup.object().shape({
            requester: Yup.string().required('Required'),
            poSoNumber: Yup.string().required('Required'),
            siteId: Yup.string().required('Required'),
            siteName: Yup.string().required('Required'),
            addressLine_1: Yup.string().required('Required'),
            addressLine_2: Yup.string(),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            postcode: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            lanIpOctet_1: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255')
              .typeError('not valid'),
            lanIpOctet_2: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            lanIpOctet_3: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            oobIpOctet_1: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            oobIpOctet_2: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            oobIpOctet_3: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            wanIpOctet_1: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            wanIpOctet_2: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
            wanIpOctet_3: Yup.number()
              .typeError('not valid')
              .required('Required')
              .min(0, '0-255')
              .max(255, '0-255'),
          })}
          onSubmit={(values) => {
            const concreteAddress =
              values.addressLine_1 +
              ' ' +
              values.addressLine_2 +
              ' ' +
              values.city +
              ' ' +
              values.state +
              ' ' +
              values.postcode +
              ' ' +
              values.country;

            const concreteIanIpSubnet =
              values.lanIpOctet_1 +
              '.' +
              values.lanIpOctet_2 +
              '.' +
              values.lanIpOctet_3;

            const concreteOobIpSubnet =
              values.oobIpOctet_1 +
              '.' +
              values.oobIpOctet_2 +
              '.' +
              values.oobIpOctet_3;

            const concreteWanIpAddress =
              values.wanIpOctet_1 +
              '.' +
              values.wanIpOctet_2 +
              '.' +
              values.wanIpOctet_3;

            const data = {
              requester: values.requester,
              poNumber: values.poSoNumber,
              siteId: values.siteId,
              siteName: values.siteName,
              siteAddress: concreteAddress,
              lanIpSubnet: concreteIanIpSubnet,
              oobMgmtSubnet: concreteOobIpSubnet,
              wanIpAddress: concreteWanIpAddress,
            };

            console.log('the data', data);

            createSite(data)
              .then((res) => {
                setOpen(true)
                setMessages('success')
  
              })
              .catch((e) => {
                setOpen(true)
                setMessages('failed')
              });
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            } = props;

            return (
              <div>
                <Grid container style={{ height: '80px' }}>
                  <Grid item xs={3} md={2}>
                    <div>
                      Requester <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div>
                      <TextField
                        fullWidth
                        label="Requester"
                        name="requester"
                        variant="outlined"
                        size="small"
                        value={values.requester}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.requester && touched.requester}
                        helperText={
                          errors.requester && touched.requester
                            ? errors.requester
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container style={{ height: '80px' }}>
                  <Grid item xs={3} md={2}>
                    <div>
                      Po/So Number <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div>
                      <TextField
                        fullWidth
                        label="Po/So Number"
                        name="poSoNumber"
                        variant="outlined"
                        size="small"
                        value={values.poSoNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.poSoNumber && touched.poSoNumber}
                        helperText={
                          errors.poSoNumber && touched.poSoNumber
                            ? errors.poSoNumber
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container style={{ height: '80px' }}>
                  <Grid item xs={3} md={2}>
                    <div>
                      Site ID <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div>
                      <TextField
                        fullWidth
                        label="Site ID"
                        name="siteId"
                        variant="outlined"
                        size="small"
                        value={values.siteId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.siteId && touched.siteId}
                        helperText={
                          errors.siteId && touched.siteId ? errors.siteId : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container style={{ height: '80px' }}>
                  <Grid item xs={3} md={2}>
                    <div>
                      Site Name <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div>
                      <TextField
                        fullWidth
                        label="Site Name"
                        name="siteName"
                        variant="outlined"
                        size="small"
                        value={values.siteName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.siteName && touched.siteName}
                        helperText={
                          errors.siteName && touched.siteName
                            ? errors.siteName
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} md={2}>
                    <div>
                      Site Address <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div style={{ height: '80px' }}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        name="addressLine_1"
                        variant="outlined"
                        size="small"
                        value={values.addressLine_1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.addressLine_1 && touched.addressLine_1}
                        helperText={
                          errors.addressLine_1 && touched.addressLine_1
                            ? errors.addressLine_1
                            : ''
                        }
                      />
                    </div>
                    <div style={{ height: '80px' }}>
                      <TextField
                        fullWidth
                        label="Address Line 2"
                        name="addressLine_2"
                        variant="outlined"
                        size="small"
                        value={values.addressLine_2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.addressLine_2 && touched.addressLine_2}
                        helperText={
                          errors.addressLine_2 && touched.addressLine_2
                            ? errors.addressLine_2
                            : ''
                        }
                      />
                    </div>
                    <div style={{ display: 'flex', height: '80px' }}>
                      <TextField
                        fullWidth
                        style={{ marginRight: '4px' }}
                        label="City / Distinct"
                        name="city"
                        variant="outlined"
                        size="small"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.city && touched.city}
                        helperText={
                          errors.city && touched.city ? errors.city : ''
                        }
                      />
                      <TextField
                        fullWidth
                        label="State / Province"
                        name="state"
                        variant="outlined"
                        size="small"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.state && touched.state}
                        helperText={
                          errors.state && touched.state ? errors.state : ''
                        }
                      />
                    </div>
                    <div style={{ display: 'flex', height: '80px' }}>
                      <TextField
                        fullWidth
                        style={{ marginRight: '4px' }}
                        label="Postal Code"
                        name="postcode"
                        variant="outlined"
                        size="small"
                        value={values.postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.postcode && touched.postcode}
                        helperText={
                          errors.postcode && touched.postcode
                            ? errors.postcode
                            : ''
                        }
                      />
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        variant="outlined"
                        size="small"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.country && touched.country}
                        helperText={
                          errors.country && touched.country
                            ? errors.country
                            : ''
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} md={2}>
                    <div>
                      Lan Subnet <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div style={{ display: 'flex', height: '80px' }}>
                      <TextField
                        fullWidth
                        name="lanIpOctet_1"
                        variant="outlined"
                        size="small"
                        value={values.lanIpOctet_1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lanIpOctet_1 && touched.lanIpOctet_1}
                        helperText={
                          errors.lanIpOctet_1 && touched.lanIpOctet_1
                            ? errors.lanIpOctet_1
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="lanIpOctet_2"
                        variant="outlined"
                        size="small"
                        value={values.lanIpOctet_2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lanIpOctet_2 && touched.lanIpOctet_2}
                        helperText={
                          errors.lanIpOctet_2 && touched.lanIpOctet_2
                            ? errors.lanIpOctet_2
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="lanIpOctet_3"
                        variant="outlined"
                        size="small"
                        value={values.lanIpOctet_3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lanIpOctet_3 && touched.lanIpOctet_3}
                        helperText={
                          errors.lanIpOctet_3 && touched.lanIpOctet_3
                            ? errors.lanIpOctet_3
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={0}
                        disabled
                      />
                      <span
                        style={{
                          marginTop: '10px',
                          marginLeft: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        /24
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} md={2}>
                    <div>
                      OOB MGMT Subnet <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div style={{ display: 'flex', height: '80px' }}>
                      <TextField
                        fullWidth
                        name="oobIpOctet_1"
                        variant="outlined"
                        size="small"
                        value={values.oobIpOctet_1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.oobIpOctet_1 && touched.oobIpOctet_1}
                        helperText={
                          errors.oobIpOctet_1 && touched.oobIpOctet_1
                            ? errors.oobIpOctet_1
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="oobIpOctet_2"
                        variant="outlined"
                        size="small"
                        value={values.oobIpOctet_2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.oobIpOctet_2 && touched.oobIpOctet_2}
                        helperText={
                          errors.oobIpOctet_2 && touched.oobIpOctet_2
                            ? errors.oobIpOctet_2
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="oobIpOctet_3"
                        variant="outlined"
                        size="small"
                        value={values.oobIpOctet_3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.oobIpOctet_3 && touched.oobIpOctet_3}
                        helperText={
                          errors.oobIpOctet_3 && touched.oobIpOctet_3
                            ? errors.oobIpOctet_3
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={0}
                        disabled
                      />
                      <span
                        style={{
                          marginTop: '10px',
                          marginLeft: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        /24
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} md={2}>
                    <div>
                      WAN IP Address <span style={{ color: 'red' }}>*</span>:
                    </div>
                  </Grid>
                  <Grid item xs={9} md={6}>
                    <div style={{ display: 'flex', height: '80px' }}>
                      <TextField
                        fullWidth
                        name="wanIpOctet_1"
                        variant="outlined"
                        size="small"
                        value={values.wanIpOctet_1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.wanIpOctet_1 && touched.wanIpOctet_1}
                        helperText={
                          errors.wanIpOctet_1 && touched.wanIpOctet_1
                            ? errors.wanIpOctet_1
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="wanIpOctet_2"
                        variant="outlined"
                        size="small"
                        value={values.wanIpOctet_2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.wanIpOctet_2 && touched.wanIpOctet_2}
                        helperText={
                          errors.wanIpOctet_2 && touched.wanIpOctet_2
                            ? errors.wanIpOctet_2
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        name="wanIpOctet_3"
                        variant="outlined"
                        size="small"
                        value={values.wanIpOctet_3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.wanIpOctet_3 && touched.wanIpOctet_3}
                        helperText={
                          errors.wanIpOctet_3 && touched.wanIpOctet_3
                            ? errors.wanIpOctet_3
                            : ''
                        }
                      />
                      <span
                        style={{
                          margin: '15px 4px 0px 4px',
                          fontWeight: 'bold',
                        }}
                      >
                        .
                      </span>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={0}
                        disabled
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} md={2}>
                    <CustomButton
                      fullWidth
                      title={'Submit'}
                      variant="contained"
                      type="submit"
                      onClick={handleSubmit}
                      color="primary"
                      style={{ paddingLeft: '10px' }}
                    />
                  </Grid>
                  <Grid item xs={9} md={6}></Grid>
                </Grid>
              </div>
            );
          }}
        </Formik>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={messages}
      />
    </div>
  );
};

export default Create;
