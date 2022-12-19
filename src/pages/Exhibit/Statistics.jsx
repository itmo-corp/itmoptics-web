import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { MIDDLE_WIDTH, MIN_WIDTH } from 'config/constants';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';

import formatNumber from 'utils/formatNumber';
import { Button, ButtonBase, CircularProgress, Fade, alpha, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

const SEPARATE_COMMENTS_BUTTON_WIDTH = 1416;
const MIN_COMMENTS_BUTTON_WIDTH = 1132;

const useDesktopStyles = makeStyles(theme => ({
  root: {
    display: 'none',
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.between(MIN_WIDTH, SEPARATE_COMMENTS_BUTTON_WIDTH)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.between(MIN_COMMENTS_BUTTON_WIDTH, MIDDLE_WIDTH)]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  scoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  grayIcon: {
    color: theme.palette.text.secondary,
    padding: 12,
  },
  scoreUpActive: {
    color: `${theme.palette.success.main} !important`,
    padding: 12,
  },
  scoreDownActive: {
    color: `${theme.palette.error.main} !important`,
    padding: 12,
  },
  shareButton: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    color: theme.palette.text.secondary,
    textTransform: 'none',
    fontSize: 16,
    fontFamily: 'Google Sans',
  },
  card: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    display: 'flex',
    gap: theme.spacing(1),
    height: 48,
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  commentsCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    fontSize: 16,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    alignItems: 'center',
    display: 'flex',
    height: 48,
    width: '100%',
  },
  commentsChevronRightIcon: {
    marginLeft: theme.spacing(1.5),
  },
  commentsCardLink: {
    display: 'flex',
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  commentsAmount: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  score: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Google Sans',
  },
  spinner: {
    width: '24px !important',
    height: '24px !important',
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    position: 'relative',
    display: 'flex',
    zIndex: 5,
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'none',
    },
  },
  title: {
    textAlign: 'left',
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    padding: theme.spacing(1.8, 0),
  },
  shareButton: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  confirmDownvoteButton: {
    height: 40,
    marginTop: theme.spacing(2),
    borderRadius: 8,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 15,
    fontWeight: 500,
  },
  scoreDrawerText: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  scoreDrawerButton: {
    padding: theme.spacing(1.5),
    flexGrow: 1,
    borderRadius: 8,
    marginTop: theme.spacing(3),
    // Thumbs Up
    '&:nth-child(1)': {
      backgroundColor: alpha(theme.palette.success.light, 0.7),
      marginRight: theme.spacing(1),
      '&:disabled': {
        backgroundColor: alpha(theme.palette.success.light, 0.4),
        color: theme.palette.text.disabled,
      },
    },
    // Thumbs Down
    '&:nth-child(2)': {
      backgroundColor: alpha(theme.palette.error.light, 0.7),
      marginLeft: theme.spacing(1),
      '&:disabled': {
        backgroundColor: alpha(theme.palette.error.light, 0.4),
        color: theme.palette.text.disabled,
      },
    },
  },
  scoreDrawerScore: {
    fontWeight: 600,
    fontFamily: 'Roboto',
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  viewsCard: {
    background: `${theme.palette.action.hover} !important`,
  },
  favoritesCard: {
    background: alpha(theme.palette.primary.main, 0.5),
    transitionDuration: `${theme.transitions.duration.complex.toString()}ms`,
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.8,
      background: theme.palette.action.hover,
    },
  },
  favoritesCardActive: {
    background: alpha(theme.palette.primary.main, 0.7),
    transitionDuration: `${theme.transitions.duration.complex.toString()}ms`,
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.8,
      background: theme.palette.action.hover,
    },
  },
  commentsCard: {
    background: alpha(theme.palette.background.paper, 0.7),
    boxShadow: `0 0 0 2px inset ${theme.palette.primary.main}`,
  },
}));

const useCardStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    borderRadius: 8,
    width: '100%',
    alignItems: 'baseline',
    overflow: 'hidden',
  },
  amount: {
    fontFamily: 'Google Sans',
    fontSize: 32,
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: '32px',
    marginBottom: 2,
  },
  icon: {
    position: 'absolute',
    top: -36,
    right: 0,
    opacity: 0.1,
    borderRadius: 8,
    '& svg': { fontSize: '6.5rem' },
  },
  text: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 500,
    color: alpha(theme.palette.text.primary, 0.5),
  },
  spinner: {
    width: '32px !important',
    height: '32px !important',
  },
  spinnerHolder: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `calc(100% - ${theme.spacing(2)}px)`,
    heigth: '100%',
  },
}));

const CardUnmemoized = ({
  className,
  amount,
  text,
  icon,
  disabled = false,
  showSpinner = false,
  ...props
}) => {
  const classes = useCardStyles();

  return (
    <Grid xs={6} lg={3} item>
      <ButtonBase className={`${classes.root} ${className}`} disabled={disabled} {...props}>
        <Fade in={showSpinner} unmountOnExit mountOnEnter>
          <div className={classes.spinnerHolder}>
            <CircularProgress thickness={4} className={classes.spinner} />
          </div>
        </Fade>
        <div className={classes.icon}>{icon}</div>
        <Typography className={classes.amount}>{amount}</Typography>
        <Typography className={classes.text}>{text}</Typography>
      </ButtonBase>
    </Grid>
  );
};

CardUnmemoized.propTypes = {
  className: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  showSpinner: PropTypes.bool,
};

const Card = React.memo(CardUnmemoized);

const ViewsCard = ({ reads }) => {
  const classes = useStyles();

  return (
    <Card
      icon={<VisibilityIcon />}
      className={classes.viewsCard}
      amount={reads}
      text="просмотров"
    />
  );
};

ViewsCard.propTypes = {
  reads: PropTypes.string.isRequired,
};

const Statistics = ({ exhibit }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { id, title, readingCount } = exhibit;
  const reading = readingCount || 987;

  const classes = useStyles();
  const classesDesktop = useDesktopStyles();

  const reads = formatNumber(Number(reading));

  const share = () => {
    const shareData = {
      title,
      url: `${process.env.PUBLIC_URL}/exhibits/${id}`,
    };

    navigator.share(shareData).catch(e => {
      if (e.message.startsWith('Internal error:')) {
        enqueueSnackbar('Не удалось поделиться статьей', {
          variant: 'error',
          autoHideDuration: 3000,
        });
      }
    });
  };

  return (
    <>
      <div className={classesDesktop.root}>
        <div className={classesDesktop.card}>
          <div className={classesDesktop.section} style={{ marginLeft: 8 }}>
            <VisibilityIcon className={classesDesktop.grayIcon} />
            <Typography className={classesDesktop.score}>{reads}</Typography>
          </div>
          <div className={classesDesktop.section} style={{ marginLeft: 16 }}>
            <Button
              className={classesDesktop.shareButton}
              variant="text"
              onClick={share}
              startIcon={<ShareIcon height={20} width={20} />}
            >
              Поделиться
            </Button>
          </div>
        </div>
      </div>

      <div className={classes.root}>
        <Typography className={classes.title}>Статистика</Typography>
        <Grid container direction="row" spacing={2}>
          <ViewsCard reads={reads} />
        </Grid>
        <Button
          className={classes.shareButton}
          variant="text"
          onClick={share}
          startIcon={<ShareIcon height={20} width={20} />}
        >
          Поделиться
        </Button>
      </div>
    </>
  );
};

Statistics.propTypes = {
  exhibit: PropTypes.object.isRequired,
};

export default React.memo(Statistics);
