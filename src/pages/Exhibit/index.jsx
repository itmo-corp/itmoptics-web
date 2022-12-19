import * as React from 'react';
import { useEffect } from 'react';
import { alpha, makeStyles, darken, lighten } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import getExhibit from 'store/actions/exhibit';
import ExhibitViewSkeleton from 'components/skeletons/ExhibitView';
import ErrorComponent from 'components/blocks/Error';
import dayjs from 'dayjs';
import FormattedText from 'components/formatters/FormattedText';
import { Grid, Typography, Fade } from '@material-ui/core';
import { MIN_WIDTH } from 'config/constants';
import OutsidePage from 'components/blocks/OutsidePage';
import { useSelector, useDispatch } from 'react-redux';
import getContrastPaperColor from 'utils/getContrastPaperColor';
import MetaTags from 'react-meta-tags';
import getExhibitLink from 'utils/getExhibitLink';
import MainBlock from 'components/blocks/MainBlock';
import { gradientColors } from 'utils/fadedLinearGradient';
import PostSidebar from './Sidebar';
import Statistics from './Statistics';

const makeGradient = theme => {
  const t =
    theme.palette.type === 'light'
      ? lighten(theme.palette.background.default, 0.1)
      : darken(theme.palette.background.paper, 0.1);
  const colors = gradientColors(t);

  return `linear-gradient(to bottom, ${colors.join(',')})`;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  hubs: {
    wordBreak: 'break-word',
    width: '100%',
    marginBottom: theme.spacing(0.5),
  },
  hubLink: {
    color: theme.palette.text.hint,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 13,
    transitionDuration: '100ms',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    ...theme.typography.body2,
  },
  hubWrapper: {
    color: theme.palette.text.hint,
    '&::after': {
      content: '",\u2004"',
    },
    '&:last-child::after': {
      content: '""',
    },
  },
  authorBar: { paddingTop: theme.spacing(2) },
  avatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
  author: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
    fontWeight: 700,
    fontSize: 13,
    textDecoration: 'none',
  },
  ts: {
    color: theme.palette.text.hint,
    fontWeight: 400,
    fontSize: 13,
    flexGrow: 1,
  },
  score: {
    fontWeight: 700,
    fontSize: 13,
    marginLeft: theme.spacing(1),
  },
  scoreIcon: {
    fontSize: '1rem',
  },
  scoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  text: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    lineHeight: '1.56',
    wordBreak: 'break-word',
    hyphens: 'none',
    color: theme.palette.text.primary,
  },
  title: {
    fontWeight: 800,
    fontFamily: 'Google Sans',
    fontSize: 24,
    lineHeight: '32px',
    wordBreak: 'break-word',
    hyphens: 'none',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1.5),
  },
  commentsButton: {
    marginTop: theme.spacing(2),
  },
  translatedBox: {
    backgroundColor: alpha(theme.palette.primary.dark, 0.1),
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    fontSize: 14,
    borderRadius: 2,
    '-webkit-tap-highlight-color': 'transparent !important',
    textDecoration: 'none !important',
    '&:active': {
      opacity: 0.9,
    },
  },
  content: {
    paddingBottom: theme.spacing(1.5),
    backgroundColor: getContrastPaperColor(theme),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
      backgroundColor: `${theme.palette.background.paper} !important`,
      marginTop: theme.spacing(1.5),
    },
  },
  sectionTitle: {
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    padding: theme.spacing(0.5, 0),
  },
  section: {
    padding: theme.spacing(1.8 / 2, 0),
  },
  sectionLinkWrapper: {
    '&::after': {
      content: '",\u2004"',
    },
    '&:last-child::after': {
      content: '""',
    },
    color: theme.palette.primary.main,
  },
  sectionLink: {
    color: theme.palette.primary.main,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 13,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    ...theme.typography.body2,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  hubsContainer: {
    marginTop: theme.spacing(0.5),
  },
  postHeader: {
    background: makeGradient(theme),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      background: 'transparent',
    },
  },
  postContainer: {
    padding: theme.spacing(0, 2),
  },
}));

const Post = () => {
  const dispatch = useDispatch();
  const exhibit = useSelector(store => store.exhibit.data);
  const fetchError = useSelector(store => store.exhibit.error);

  const { id: strigifiedId } = useParams();
  const id = Number(strigifiedId);

  const classes = useStyles();
  const contentsRef = React.useRef();

  const shouldShowContents = exhibit;

  useEffect(() => {
    dispatch(getExhibit(id));
  }, [id]);

  if (fetchError) {
    return (
      <OutsidePage hidePositionBar headerText="Ошибка">
        <ErrorComponent message={fetchError} />
      </OutsidePage>
    );
  }

  return (
    <OutsidePage
      hidePositionBar={!shouldShowContents}
      headerText={exhibit?.title}
      scrollElement={contentsRef.current}
    >
      <MetaTags>
        <title>{`${exhibit ? exhibit.title : 'Экспонат'} | IT[M]Optics.`}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@itmoptics" />
        <meta name="twitter:title" content={exhibit?.title} />
        <meta name="description" content={exhibit?.text} />
        <meta itemProp="description" content={exhibit?.text} />
        <meta property="og:description" content={exhibit?.text} />
        <meta property="aiturec:description" content={exhibit?.text} />
        <meta name="twitter:description" content={exhibit?.text} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={process.env.PUBLIC_URL + getExhibitLink(exhibit)} />
        <meta itemProp="name" content={exhibit?.title} />
        <meta property="og:title" content={exhibit?.title} />
        <meta property="aiturec:title" content={exhibit?.title} />
        <meta property="aiturec:item_id" content={exhibit?.id.toString()} />
        <meta property="aiturec:datetime" content={exhibit?.createdAt} />
      </MetaTags>

      <MainBlock>
        <div className={classes.root}>
          <div className={classes.content} ref={contentsRef}>
            {shouldShowContents && (
              <>
                <Fade in>
                  <div className={classes.postHeader}>
                    <Grid
                      className={classes.authorBar}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      <Typography className={classes.ts}>
                        {dayjs(exhibit.createdAt).fromNow()}
                      </Typography>
                    </Grid>
                    <FormattedText className={classes.title}>{exhibit.title}</FormattedText>
                  </div>
                </Fade>

                <Fade in>
                  <div className={classes.postContainer}>
                    <FormattedText className={classes.text}>{exhibit.text}</FormattedText>
                  </div>
                </Fade>
              </>
            )}
            {!shouldShowContents && <ExhibitViewSkeleton />}
          </div>

          {exhibit && <Statistics exhibit={exhibit} />}
        </div>
      </MainBlock>
      <PostSidebar />
    </OutsidePage>
  );
};

export default React.memo(Post);
