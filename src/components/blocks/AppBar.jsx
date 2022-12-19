import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Setting } from 'react-iconly';
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded';

import { useHistory, useLocation } from 'react-router-dom';
import { APP_BAR_HEIGHT, MAX_WIDTH, MIDDLE_WIDTH } from 'config/constants';

import { Offline } from 'react-detect-offline';
import useRoute from 'hooks/useRoute';
import { alpha } from '@material-ui/core';
import useAppBarScrollTrigger from 'hooks/useAppBarScrollTrigger';
import getSecondaryAppBarColor from 'utils/getSecondaryAppBarColor';

const makeAppBarBackgroundColor = ({ isTransformed, appBarColor, shouldChangeColors, theme }) => {
  if (shouldChangeColors) {
    return isTransformed ? getSecondaryAppBarColor(theme) : theme.palette.background.paper;
  }
  return appBarColor ? appBarColor(theme) : theme.palette.background.paper;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: props => makeAppBarBackgroundColor({ ...props, theme }),
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      display: 'none',
    },
    color: theme.palette.text.primary,
    position: 'fixed',
    height: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
    zIndex: theme.zIndex.appBar + 1,
    willChange: 'transform',
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    height: APP_BAR_HEIGHT,
    padding: 0,
    maxWidth: MAX_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  headerTitle: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Google Sans',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
    userSelect: 'none',
  },
  headerTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  offline: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
  },
}));

const AppBarComponent = () => {
  const trigger = useAppBarScrollTrigger();
  const history = useHistory();
  const location = useLocation();
  const route = useRoute();

  const shouldChangeColors = route.shouldAppBarChangeColors;
  const appBarColor = route.appBarColor;
  const isHidden = !route.shouldShowAppBar;

  const classes = useStyles({
    isTransformed: trigger,
    appBarColor,
    shouldChangeColors,
  });

  const goHome = () => {
    window.scrollTo(0, 0);
    history.push('/');
  };

  const goSettings = () => history.push('/settings', {
    from: location.pathname + location.search,
    scroll: window.pageYOffset,
  });

  // Do not render the AppBar if it is hidden by the route
  if (isHidden) return null;

  return (
    <>
      <AppBar className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
            <div className={classes.headerTitleWrapper}>
              <Typography onClick={goHome} variant="h6" className={classes.headerTitle}>
                IT[M]Optics
              </Typography>
              <Offline
                polling={{
                  url: 'https://ipv4.icanhazip.com',
                }}
              >
                <WifiOffRoundedIcon className={classes.offline} />
              </Offline>
            </div>
            <IconButton onClick={goSettings}>
              <Setting set="light" size={24} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(AppBarComponent);
