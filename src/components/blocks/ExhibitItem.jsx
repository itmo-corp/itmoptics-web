/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { alpha } from '@material-ui/core';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import { darken, lighten, makeStyles } from '@material-ui/core/styles';
import formatNumber from 'utils/formatNumber';
import GreenRedNumber from 'components/formatters/GreenRedNumber';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import {
  DEFAULT_POST_ITEM_HEIGHT,
  MIN_WIDTH,
  POST_IMAGE_HEIGHT,
  POST_ITEM_VISIBILITY_THRESHOLD,
} from 'config/constants';
import getPostLink from 'utils/getExhibitLink';
import VisibilitySensor from 'react-visibility-sensor';
import isDarkTheme from 'utils/isDarkTheme';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LazyLoadImage from './LazyLoadImage';
import LinkToOutsidePage from './LinkToOutsidePage';

const NBSP_CHAR = ' ';
const WHITESPACE_CHAR = ' ';
const ld = theme => (isDarkTheme(theme) ? darken : lighten);
const useStyles = makeStyles(theme => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  unreadCommentsCount: { color: theme.palette.primary.main, marginLeft: 4 },
  placeholder: {
    height: DEFAULT_POST_ITEM_HEIGHT,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 12,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  leadText: {
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  postLink: {
    color: theme.palette.text.primary,
    '&:visited': {
      color: ld(theme)(theme.palette.text.primary, 0.4),
    },
    padding: theme.spacing(0, 2),
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 20,
    marginTop: ({ hasImage }) => (hasImage ? 0 : theme.spacing(1)),
    '& .searched-item': {
      color: theme.palette.primary.light, // Highlight the search query in post's title
    },
  },
  paper: {
    background: theme.palette.background.paper,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  padding: {
    padding: theme.spacing(2),
  },
  imageHolder: {
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    height: ({ hasImage }) => (hasImage ? POST_IMAGE_HEIGHT : '100%'),
    marginBottom: ({ hasImage }) => (hasImage ? theme.spacing(2) : 0),
  },
  image: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
    width: '100vw',
    display: 'flex',
    background: theme.palette.action.hover,
  },
  leadImageWrapper: {
    marginBottom: theme.spacing(2),
    maxHeight: 500,
    objectFit: 'cover',
    paddingBottom: '56.4103%',
    position: 'relative',
    width: '100%',
  },
  leadImage: {
    maxWidth: '100%',
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    objectPosition: '0% 0%',
  },
  leadButton: {
    textTransform: 'none',
    borderRadius: 6,
    marginTop: theme.spacing(2),
  },
  postAuthor: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
    fontWeight: 800,
  },
  postTs: {
    color: theme.palette.text.hint,
    flexGrow: 1,
  },
  postAvatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: 4,
  },
  postBottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up(765)]: {
      maxWidth: 400,
    },
  },
  postBottomRowItem: {
    color: theme.palette.text.hint,
    textDecoration: 'none',
    padding: ({ hasImage }) => theme.spacing(hasImage ? 2 : 1.5, 0, 2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
  },
  postBottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  postBottomRowItemText: {
    fontSize: 13,
    fontWeight: 600,
  },
  avatarContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none !important',
    paddingBottom: ({ hasImage, isExtended }) => {
      if (isExtended) return theme.spacing(1);
      if (hasImage) return theme.spacing(2);
      return 0;
    },
  },
  trollWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    textDecoration: 'none !important',
  },
  trollText: {
    color: theme.palette.text.hint,
    fontFamily: 'Google Sans',
    fontWeight: 500,
  },
  trollTextTitle: {
    color: theme.palette.text.hint,
    fontFamily: 'Google Sans',
    fontWeight: 400,
    textDecoration: 'none !important',
  },
  trollLink: {
    color: theme.palette.primary.main,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  labelsContainer: {
    padding: theme.spacing(0, 2),
  },
  postTypeVoice: {
    color: theme.palette.error.light,
    marginBottom: theme.spacing(1),
    overflowWrap: 'break-word',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  hubs: {
    wordBreak: 'break-word',
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0, 2),
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
}));

const ExhibitItem = ({
  post,
  style,
  setExhibitItemSize,
  getExhibitItemSize = () => DEFAULT_POST_ITEM_HEIGHT,
}) => {
  const isExtended = false;
  const hideImage = useSelector(
    store => store.settings.readerSettings.replaceImagesWithPlaceholder
  );

  const {
    title: unparsedTitle,
    createdAt,
    statistics,
    image: apiImage,
  } = post || {};
  const image =
    apiImage ||
    'https://cdn1.byjus.com/wp-content/uploads/2018/11/physics/wp-content/uploads/2016/08/4.png';

  const classes = useStyles({
    hasImage: !!image && !hideImage,
    isExtended,
  });

  const [isRendered, setIsRendered] = React.useState(false);
  const ts = dayjs(createdAt).calendar().toLowerCase();
  const title = parse(unparsedTitle.replace(NBSP_CHAR, WHITESPACE_CHAR));

  const unformattedScore = 10;
  const score = formatNumber(unformattedScore);
  const reads = formatNumber(200);

  const rootRef = React.useRef();
  const placeholderStyles = React.useMemo(
    () => ({ height: getExhibitItemSize(post.id) }),
    [getExhibitItemSize]
  );
  const postLink = getPostLink(post);
  const linkProps = {
    rel: 'noreferrer',
    target: '_self',
  };
  const shouldShowPostImage = image && !hideImage && !isExtended;
  const bottomRow = [
    {
      icon: <ThumbsUpDownIcon className={classes.postBottomRowItemIcon} />,
      text: <>{score}</>,
      coloredText: true,
      number: unformattedScore,
    },
    {
      icon: <VisibilityIcon className={classes.postBottomRowItemIcon} />,
      text: <>{reads}</>,
    },
  ];

  const BottomRowItemUnmemoized = ({ item }) => {
    const itemIcon = item.icon;
    return (
      <Grid
        xs={3}
        item
        onClick={item.action}
        style={{
          cursor: item.action ? 'pointer' : 'inherit',
        }}
        className={classes.postBottomRowItem}
      >
        {item.coloredText ? (
          <GreenRedNumber
            number={item.number}
            wrapperProps={{ style: { display: 'flex', alignItems: 'center' } }}
          >
            <>
              {itemIcon}
              <Typography className={classes.postBottomRowItemText}>
                {item.number > 0 ? '+' : ''}
                {item.text}
              </Typography>
            </>
          </GreenRedNumber>
        ) : (
          <>
            {itemIcon}
            <Typography
              className={classes.postBottomRowItemText}
              color={item.isActive ? 'primary' : 'initial'}
            >
              {item.text}
            </Typography>
          </>
        )}
      </Grid>
    );
  };
  BottomRowItemUnmemoized.propTypes = {
    item: PropTypes.object.isRequired,
  };

  const BottomRowItem = React.memo(BottomRowItemUnmemoized);

  useEffect(() => {
    if (setExhibitItemSize && isRendered && rootRef.current) {
      setExhibitItemSize(post.id, rootRef.current.getBoundingClientRect().height);
    }
  }, [isRendered]);

  return (
    <VisibilitySensor
      partialVisibility
      offset={{
        top: POST_ITEM_VISIBILITY_THRESHOLD,
        bottom: POST_ITEM_VISIBILITY_THRESHOLD,
      }}
      active={!isRendered}
      onChange={newIsVisible => setIsRendered(newIsVisible)}
    >
      {({ isVisible }) => (isVisible ? (
        <Paper ref={rootRef} elevation={0} className={classes.paper} style={style}>
          <div className={classes.avatarContainer}>
            <Typography className={classes.postTs} variant="caption">
              {ts}
            </Typography>
          </div>
          {shouldShowPostImage && (
            <LinkToOutsidePage {...linkProps} className={classes.imageHolder} to={postLink}>
              <LazyLoadImage
                src={image}
                alt="Post header image"
                className={classes.image}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                disableZoom
              />
            </LinkToOutsidePage>
          )}

          <LinkToOutsidePage
            className={[classes.postLink, classes.noDeco].join(' ')}
            to={postLink}
            {...linkProps}
          >
            {title}
          </LinkToOutsidePage>

          <div className={classes.postBottomRow}>
            {bottomRow.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <BottomRowItem item={e} key={i} />
            ))}
          </div>
        </Paper>
      ) : (
        <div style={placeholderStyles} className={classes.placeholder} />
      ))}
    </VisibilitySensor>
  );
};

ExhibitItem.propTypes = {
  post: PropTypes.object.isRequired,
  style: PropTypes.object,
  setExhibitItemSize: PropTypes.func,
  getExhibitItemSize: PropTypes.func,
};

export default React.memo(ExhibitItem);
