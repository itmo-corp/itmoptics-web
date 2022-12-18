import * as React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  redText: { color: `${theme.palette.error.main} !important` },
  greenText: { color: `${theme.palette.success.main} !important` },
}));

const GreenRedNumber = ({ children, wrapperProps = {}, number }) => {
  const classes = useStyles();
  const { className: wrapperPropsClassName, ...otherWrapperProps } = wrapperProps;
  const wrapperClassName = wrapperPropsClassName ? ` ${wrapperPropsClassName}` : '';
  let className = '';

  if (number > 0) {
    className = classes.greenText;
  } else if (number < 0) {
    className = classes.redText;
  }

  return (
    <div className={className + wrapperClassName} {...otherWrapperProps}>
      {children}
    </div>
  );
};

GreenRedNumber.propTypes = {
  number: PropTypes.any.isRequired,
  children: PropTypes.node,
  wrapperProps: PropTypes.object,
};

export default React.memo(GreenRedNumber);
