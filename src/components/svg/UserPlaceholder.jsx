import React from 'react';
import PropTypes from 'prop-types';

import { indigo, red, green, purple, orange } from '@material-ui/core/colors';

const colors = [indigo[400], red[400], green[400], orange[400], purple[400]];

const UserPlaceholder = ({ num }) => {
  const n = num % colors.length;
  const color = colors[n];

  return (
    <svg viewBox="0 0 24 24" fill={color}>
      <style type="text/css">
        {'.st0{fill-rule:evenodd;clip-rule:evenodd;}'}
        {`.st1{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:${color};stroke-miterlimit:10;}`}
      </style>
      <path
        className="st0"
        d="M10.9,9.73c0.17,0.18,0.39,0.31,0.64,0.31h0.91c0.25,0,0.48-0.12,0.64-0.31c0.62-0.69,1.52-1.12,2.52-1.12
        C17.48,8.61,19,10.13,19,12c0,1.84-1.47,3.34-3.3,3.39c0,0,0,0,0,0c0,0,0,0,0,0H8.3c0,0,0,0,0,0c0,0,0,0,0,0
        C6.47,15.34,5,13.84,5,12c0-1.87,1.52-3.39,3.39-3.39C9.39,8.61,10.28,9.04,10.9,9.73z M8.38,10.75c0.34,0,0.62,0.28,0.62,0.62v1.33
        c0,0.34-0.28,0.62-0.62,0.62c-0.34,0-0.62-0.28-0.62-0.62v-1.33C7.76,11.03,8.04,10.75,8.38,10.75z M15.01,11.38
        c0-0.34,0.28-0.62,0.62-0.62c0.34,0,0.62,0.28,0.62,0.62v1.33c0,0.34-0.28,0.62-0.62,0.62c-0.34,0-0.62-0.28-0.62-0.62V11.38z
        M12.98,13.99c0.12-0.11,0.09-0.3-0.04-0.39c-0.13-0.1-0.31-0.06-0.45,0.03c-0.03,0.02-0.06,0.04-0.1,0.06
        c-0.12,0.06-0.26,0.09-0.39,0.09c-0.14,0-0.27-0.03-0.39-0.09c-0.03-0.02-0.07-0.04-0.1-0.06c-0.13-0.09-0.32-0.13-0.45-0.03
        c-0.13,0.1-0.16,0.28-0.04,0.39c0.1,0.09,0.2,0.16,0.32,0.22c0.2,0.1,0.43,0.16,0.66,0.16c0.23,0,0.46-0.05,0.66-0.16
        C12.78,14.15,12.89,14.07,12.98,13.99z"
      />
      <path
        className="st1"
        d="M12,23.5L12,23.5C5.65,23.5,0.5,18.35,0.5,12v0C0.5,5.65,5.65,0.5,12,0.5h0c6.35,0,11.5,5.15,11.5,11.5v0
        C23.5,18.35,18.35,23.5,12,23.5z"
      />
    </svg>
  );
};

UserPlaceholder.propTypes = {
  num: PropTypes.number.isRequired,
};

export default React.memo(UserPlaceholder);
