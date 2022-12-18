import React from 'react';
import PropTypes from 'prop-types';

import { Toolbar, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getSecondaryAppBarColor from 'utils/getSecondaryAppBarColor';
import { MAX_WIDTH, APP_BAR_HEIGHT, FLOWS, DRAWER_WIDTH, MIDDLE_WIDTH } from 'config/constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: getSecondaryAppBarColor(theme),
    color: theme.palette.text.primary,
    position: 'absolute',
    height: APP_BAR_HEIGHT,
    top: APP_BAR_HEIGHT,
    flexGrow: 1,
    zIndex: theme.zIndex.appBar,
    willChange: 'transform',
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      paddingLeft: DRAWER_WIDTH,
      position: 'fixed',
      top: 0,
    },
  },
  toolbar: {
    minHeight: 'unset',
    height: APP_BAR_HEIGHT,
    padding: 0,
    maxWidth: MAX_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflow: 'auto',
  },
  link: {
    '&:first-child': {
      marginLeft: theme.spacing(1),
    },
    '&:last-child': {
      paddingRight: theme.spacing(2),
    },
    flexShrink: 0,
    textDecoration: 'none',
    fontWeight: 700,
    fontFamily: 'Google Sans',
    fontSize: 15,
    color: theme.palette.text.secondary,
    transitionDuration: `${theme.transitions.duration.shortest}ms`,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));

const FlowsBar = ({ flow, onClick }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.content}>
          {FLOWS.map(e => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <a
              className={[classes.link]
                .concat(flow === e.alias ? [classes.selected] : [])
                .join(' ')}
              key={e.alias}
              onClick={() => onClick(e)}
            >
              {e.title}
            </a>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

FlowsBar.propTypes = {
  flow: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FlowsBar;
