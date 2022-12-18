import * as React from 'react';

import { useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { MIN_WIDTH } from 'config/constants';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '12px',
    background: theme.palette.background.paper,
    borderRadius: 0,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  padding: {
    padding: theme.spacing(2),
  },
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
  skeletonImage: {
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover,
  },
}));

const PostSkeleton = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid
          direction="row"
          alignItems="center"
          container
          className={classes.padding}
          style={{ width: '100%' }}
        >
          <Skeleton
            variant="circle"
            width={20}
            height={20}
            className={classes.skeleton}
            style={{ marginRight: 8 }}
          />
          <Skeleton variant="text" width={128} className={classes.skeleton} height={20} />
        </Grid>
        <Grid container style={{ paddingTop: 0 }} className={classes.padding}>
          <Grid item xs={12}>
            <Skeleton variant="rect" width="100%" className={classes.skeleton} height={18} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="rect"
              width="75%"
              className={classes.skeleton}
              height={18}
              style={{ marginTop: 16 }}
            />
          </Grid>
          <Grid container style={{ width: '100%' }} direction="row">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid justifyContent="center" style={{ width: '25%' }} container key={i}>
                  <Skeleton
                    variant="rect"
                    width={64}
                    style={{ marginTop: 20 }}
                    className={classes.skeleton}
                    height={21}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(PostSkeleton);
