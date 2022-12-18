import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LinkToOutsidePage = ({ to, children, ...props }, ref) => {
  const location = useLocation();

  return (
    <Link
      to={() => ({
        pathname: to,
        state: {
          from: location.pathname + location.search,
          scroll: window.pageYOffset,
        },
      })}
      ref={ref}
      {...props}
    >
      {children}
    </Link>
  );
};

export default React.memo(React.forwardRef(LinkToOutsidePage));
