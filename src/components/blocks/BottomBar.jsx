import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Paper, useMediaQuery, useTheme } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { BOTTOM_BAR_HEIGHT, makeNavigationTabs, MIDDLE_WIDTH } from 'config/constants';

import getContrastPaperColor from 'utils/getContrastPaperColor';
import useRoute from 'hooks/useRoute';

const NAVIGATION_TABS = makeNavigationTabs();

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: theme.zIndex.appBar,
    width: '100%',
    willChange: 'transform',
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      display: 'none',
    },
  },
  container: {
    background: getContrastPaperColor(theme),
    height: BOTTOM_BAR_HEIGHT,
    paddingBottom: 'env(safe-area-inset-bottom, 0)',
  },
  item: {
    fontFamily: 'Google Sans',
    fontSize: '12px',
    transitionDuration: '50ms',
  },
  selected: {
    fontSize: '12.5px !important',
  },
}));

const findPathValue = route => {
  return NAVIGATION_TABS.findIndex(e => {
    if (Array.isArray(e.match)) {
      return e.match.some(k => k === route.alias);
    }
    return e.match === route.alias;
  });
};

const BottomBar = () => {
  const route = useRoute();
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [isShown, setShown] = React.useState(false);
  const [value, setValue] = useState(findPathValue(route));
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const shouldHideBottomBar = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  });
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const go = e => {
    if (history.location.pathname !== e.to()) {
      history.push(e.to());
    }
  };

  const hideAppBarHandler = r => {
    setShown(r.shouldShowAppBar);
  };

  useEffect(() => {
    hideAppBarHandler(route);
    setValue(findPathValue(route));
  }, [route]);

  if (shouldHideBottomBar) return null;

  return isShown ? (
    <Paper elevation={2} className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.container}
      >
        {NAVIGATION_TABS.map(e => (
          <BottomNavigationAction
            key={e.label}
            classes={{ label: classes.item, selected: classes.selected }}
            icon={e.icon}
            onClick={() => go(e)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  ) : null;
};

export default React.memo(BottomBar);
