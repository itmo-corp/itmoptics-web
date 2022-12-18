import React from 'react';
import PropTypes from 'prop-types';

import StickyBox from 'react-sticky-box';
import { APP_BAR_HEIGHT, BOTTOM_BAR_HEIGHT, MIDDLE_WIDTH, MIN_WIDTH } from 'config/constants';

import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: 300,
    flexDirection: 'column',
  },
}));

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const shouldShowSidebar = useMediaQuery(theme.breakpoints.up(MIN_WIDTH), {
    noSsr: true,
  });
  const disableBottomOffset = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  });

  return shouldShowSidebar ? (
    <StickyBox
      className={classes.root}
      offsetTop={theme.spacing(1.5) + APP_BAR_HEIGHT}
      offsetBottom={theme.spacing(2) + (disableBottomOffset ? 0 : BOTTOM_BAR_HEIGHT)}
    >
      {children}
    </StickyBox>
  ) : null;
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
