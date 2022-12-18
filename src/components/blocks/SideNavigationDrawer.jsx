import React from 'react';

import { ButtonBase, Drawer, Typography, useTheme } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';

import { APP_BAR_HEIGHT, makeNavigationTabs, DRAWER_WIDTH, MIDDLE_WIDTH } from 'config/constants';
import getSecondaryAppBarColor from 'utils/getSecondaryAppBarColor';

import useRoute from 'hooks/useRoute';

import { useHistory } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NAVIGATION_TABS = makeNavigationTabs(28, 28, true);

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    display: 'flex',
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    border: 'none',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    height: '100%',
  },
  logoHolder: {
    backgroundColor: getSecondaryAppBarColor(theme),
    color: theme.palette.text.primary,
    height: APP_BAR_HEIGHT,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
    userSelect: 'none',
  },
  logo: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontSize: 20,
    marginLeft: theme.spacing(2),
    fontFamily: 'Google Sans',
  },
  tabsHolder: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  bottomBlock: {
    padding: theme.spacing(0, 2),
    margin: theme.spacing(1, 0),
  },
}));

const useNavButtonStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 1.5, 1, 1.25),
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: alpha(theme.palette.text.primary, 0.75),
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
  match: {
    color: `${theme.palette.text.primary} !important`,
    background: alpha(theme.palette.text.primary, 0.1),
  },
  label: {
    transitionDuration: '0.1s',
    marginLeft: theme.spacing(2),
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
}));

const isCurrent = (obj, route) => {
  if (Array.isArray(obj.match)) {
    return obj.match.some(k => k === route.alias);
  }
  return obj.match === route.alias;
};

// eslint-disable-next-line react/prop-types
const NavButton = ({ label, icon, to, current }) => {
  const classes = useNavButtonStyles();
  const history = useHistory();
  const handleClick = () => {
    const link = to();
    if (history.location.pathname !== link) {
      history.push(link);
    }
  };

  return (
    <ButtonBase
      className={classes.root + (current ? ` ${classes.match}` : '')}
      onClick={() => handleClick()}
    >
      <div className={classes.icon}>{icon}</div>
      <Typography className={classes.label} component="span">
        {label}
      </Typography>
    </ButtonBase>
  );
};

const SideNavigationDrawer = () => {
  const theme = useTheme();
  const route = useRoute();
  const classes = useStyles();

  const history = useHistory();
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const shouldShowDrawer = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  });

  // Do not render drawer on mobile and tablet
  if (!shouldShowDrawer) return null;

  const goHome = () => {
    window.scrollTo(0, 0);
    history.push('/');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <div className={classes.logoHolder}>
          <Typography onClick={() => goHome()} variant="h6" className={classes.logo}>
            <img src="./images/logo.ico" alt="logo" height="40" width="40" />
            IT[M]Optics
          </Typography>
        </div>
        <div className={classes.tabsHolder}>
          {NAVIGATION_TABS.map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavButton current={isCurrent(e, route)} key={i} {...e} />
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default SideNavigationDrawer;
