import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Fade, makeStyles, Portal, Typography } from '@material-ui/core';

import ProgressiveImage from 'react-lazy-progressive-image';
import { PhotoSwipe } from 'react-photoswipe';

import { POST_ITEM_VISIBILITY_THRESHOLD } from 'config/constants';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    overflow: 'hidden',
    display: 'inline-flex',
    flexDirection: 'column',
  },
  image: {
    height: 'auto',
    maxWidth: '100%',
    verticalAlign: 'middle',
    '-webkit-tap-highlight-color': 'transparent',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    fontSize: 12,
  },
  imagePlaceholder: {
    height: 'auto',
    maxWidth: '100%',
    verticalAlign: 'middle',
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'imgAlign-left': {
    float: 'left',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
  'imgAlign-right': {
    float: 'right',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
}));

const useImagePlaceholderStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: theme.palette.action.hover,
    borderRadius: 4,
    maxWidth: '100%',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    fontWeight: 500,
    color: `${theme.palette.text.primary} !important`,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: '14px !important',
    fontWeight: 'normal',
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
    marginTop: `${theme.spacing(1)}px !important`,
  },
  button: {
    padding: theme.spacing(1.5, 2),
    width: '100%',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover > p': {
      color: theme.palette.primary.main,
    },
  },
}));

const ImagePlaceholderUnmemoized = ({ style, showMediaElementText, setShouldShowImage }) => {
  const classes = useImagePlaceholderStyles();
  const handleClick = () => setShouldShowImage(true);

  return (
    <div className={classes.root} style={{ aspectRatio: `auto ${style.width} / ${style.height}` }}>
      <button type="button" onClick={handleClick} className={classes.button}>
        <Typography className={classes.title}>
          {showMediaElementText ? 'Здесь был медиаэлемент' : 'Здесь была картинка'}
        </Typography>
        <Typography className={classes.text}>Нажмите здесь, чтобы показать элемент</Typography>
      </button>
    </div>
  );
};

ImagePlaceholderUnmemoized.propTypes = {
  style: PropTypes.object,
  showMediaElementText: PropTypes.bool,
  setShouldShowImage: PropTypes.func,
};

const ImagePlaceholder = React.memo(ImagePlaceholderUnmemoized);

const ImageUnmemoized = React.forwardRef(
  ({ src, loading, style, alt, className, align, onClick }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const classes = useStyles();
    const imgClasses = [classes.image, className];
    const loadingStyle = hasError || !loading ? {} : { filter: 'blur(16px)' };
    const imageContainerClasses = [classes.imageContainer];

    if (loading && (!src || src === '/img/image-loader.svg')) {
      return (
        <span
          className={`${classes.imagePlaceholder} ${className}`}
          style={{
            ...style,
            aspectRatio: `auto ${style.width} / ${style.height}`,
          }}
        >
          <CircularProgress size="1.25rem" thickness={5} />
        </span>
      );
    }

    if (align) imageContainerClasses.push(classes[`imgAlign-${align}`]);

    return (
      <div
        className={imageContainerClasses.join(' ')}
        style={{
          aspectRatio: `auto ${style.width} / ${style.height}`,
        }}
      >
        <Fade in timeout={250} mountOnEnter>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            ref={ref}
            onClick={() => !loading && !hasError && onClick()}
            className={imgClasses.join(' ')}
            width={style?.width}
            height={style?.height}
            style={loadingStyle}
            src={src}
            alt={alt || 'Изображение не загружено'}
            onError={() => setHasError(true)}
          />
        </Fade>
      </div>
    );
  }
);

ImageUnmemoized.propTypes = {
  src: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  align: PropTypes.any,
  onClick: PropTypes.func,
};

const Image = React.memo(ImageUnmemoized);

const LazyLoadImage = ({ src, style, alt, className, disableZoom, align, placeholderSrc }) => {
  const shouldReplaceImagesWithPlaceholder = useSelector(
    store => store.settings.readerSettings.replaceImagesWithPlaceholder
  );
  const [isOpen, setOpen] = useState(false);
  const [shouldShowImage, setShouldShowImage] = useState(!shouldReplaceImagesWithPlaceholder);
  const imageRef = useRef(null);
  const showByDefault = !!placeholderSrc;

  const items = React.useRef([
    {
      src,
      w: 1080,
      h: 1920,
    },
  ]);
  const pswpOptions = {
    showHideOpacity: false,
    bgOpacity: 0.8,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: false,
    captionEl: false,
    tapToClose: true,
    pinchToClose: false,
    maxSpreadZoom: 4,
    history: false,
  };

  const onClick = () => {
    if (disableZoom || !imageRef?.current) return;
    const windowWidth = window.innerWidth - 32;
    const n = windowWidth / imageRef?.current?.clientWidth;
    items.current = [
      {
        src,
        w: windowWidth,
        h: imageRef?.current?.clientHeight * n,
      },
    ];
    setOpen(true);
  };

  return shouldShowImage ? (
    <>
      <ProgressiveImage
        placeholder={placeholderSrc}
        src={src}
        visibilitySensorProps={{
          partialVisibility: true,
          offset: {
            top: showByDefault ? -Infinity : POST_ITEM_VISIBILITY_THRESHOLD,
            bottom: showByDefault ? -Infinity : POST_ITEM_VISIBILITY_THRESHOLD,
          },
        }}
      >
        {(source, loading, isVisible) => (
          <Image
            ref={imageRef}
            src={source}
            onClick={onClick}
            loading={loading}
            isVisible={isVisible}
            style={style}
            alt={alt}
            align={align}
            className={className}
          />
        )}
      </ProgressiveImage>
      {isOpen && !disableZoom && imageRef.current && (
        <Portal container={document.body}>
          <PhotoSwipe
            options={pswpOptions}
            isOpen={isOpen}
            items={items.current}
            onClose={() => setOpen(false)}
          />
        </Portal>
      )}
    </>
  ) : (
    <ImagePlaceholder setShouldShowImage={setShouldShowImage} style={style} />
  );
};

LazyLoadImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string,
  style: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disableZoom: PropTypes.bool,
  align: PropTypes.any,
};

export default React.memo(LazyLoadImage);
