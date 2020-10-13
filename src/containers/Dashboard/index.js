import React from 'react';
import { useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/styles';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { Grid, Typography, Paper, TextField } from '@material-ui/core';
import CustomButton from 'components/common/CustomButton';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // height: '100vh',
//   },
// }));

const Dashboard = () => {
  const history = useHistory();
  return (
    <CustomButton
      fullWidth
      title={'Add'}
      variant="contained"
      color="primary"
      type="submit"
      onClick={() => {
        history.push('/create');
      }}
    />
  );
};

export default Dashboard;
