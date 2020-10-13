import React from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.scss';

const CustomCircularProgress = ({ text, size, className }) => {
  return (
    <div className={clsx([className, 'CircularProgress_container'])}>
      <CircularProgress size={size} />
      <div>{text}</div>
    </div>
  );
};

export default React.memo(CustomCircularProgress);
