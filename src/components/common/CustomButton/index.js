import React from 'react';
import {
  Button,
} from '@material-ui/core';
import CircularProgress from '../CircularProgress';

import './styles.scss';

const CustomButton = ({
  title,
  loading,
  onClick,
  style,
  ...rest
}) => {
  return (
    <div className="CustomButton_container" style={style}>
      <Button
        {...rest}
        onClick={onClick}
        className="CustomButton_button"
      >
        {title}
      </Button>
      {loading && <CircularProgress className="CustomButton_loading" size={18} />}
    </div>
  );
};

export default CustomButton;
