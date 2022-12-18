import * as React from 'react';

import {
  makeStyles,
  alpha,
  darken,
  lighten,
  rgbToHex,
} from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

import PropTypes from 'prop-types';

import SyntaxHighlighter from 'react-syntax-highlighter';

import parse, { domToReact } from 'html-react-parser';
import sanitize from 'utils/sanitize';

import getInvertedContrastPaperColor from 'utils/getInvertedContrastPaperColor';
import isDarkTheme from 'utils/isDarkTheme';
import { APP_BAR_HEIGHT, MIN_WIDTH } from 'config/constants';
import { useSelector } from 'react-redux';
import blend from 'utils/blendColors';
import getContrastPaperColor from 'utils/getContrastPaperColor';
import getCodeHighlighterStyle from 'utils/getCodeHighlighterStyle';

import Details from 'components/blocks/Details';
import LazyLoadImage from 'components/blocks/LazyLoadImage';
import Spoiler from 'components/blocks/Spoiler';

const useStyles = makeStyles(theme => ({
  img: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
    borderRadius: 4,
    marginTop: theme.spacing(1),
  },
  text: {
    fontSize: ({ readerSettings }) => readerSettings.fontSize,
    fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    '-ms-word-break': 'break-all',
    wordBreak: 'break-word',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '-webkit-tap-highlight-color': 'transparent !important',
    },
    '& a:hover': {
      color: alpha(theme.palette.primary.main, 0.8),
      textDecoration: 'underline',
    },
    '& p': {
      margin: 0,
      fontSize: ({ readerSettings }) => readerSettings.fontSize,
      fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    },
    '& em': {
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
    },
    '& code': {
      background: ({ inverseColors }) => (inverseColors
        ? getContrastPaperColor(theme)
        : getInvertedContrastPaperColor(theme)),
      padding: '3px 6px',
      borderRadius: theme.shape.borderRadius,
      wordBreak: 'break-word',
    },
    '& div.table, div.scrollable-table': {
      overflow: 'auto',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      wordBreak: 'normal',
    },
    '& sub, sup': {
      fontSize: '75%',
      lineHeight: 0,
      position: 'relative',
      verticalAlign: 'initial',
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& table td': {
      padding: '6px 12px 9px',
      border: `1px solid ${theme.palette.text.hint}`,
      verticalAlign: 'top',
      lineHeight: '1.5',
      minWidth: 100,
    },
    '& table th': {
      padding: '6px 12px 9px',
      border: `1px solid ${theme.palette.text.hint}`,
      verticalAlign: 'top',
      lineHeight: '1.5',
      minWidth: 100,
    },
    // '& h1, h2, h3': {
    //   fontSize: 24,
    //   lineHeight: '30px',
    // },
    // '& h4, h5, h6': {
    //   fontSize: 20,
    //   lineHeight: '26px',
    // },
    '& blockquote': {
      margin: '12px 0',
      padding: '0 12px',
      display: 'block',
      borderLeft: `4px solid ${theme.palette.primary.light}`,
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
      fontStyle: 'italic',
    },
    '& hr': {
      border: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(1, 2),
    },
    '& figure': {
      margin: 0,
      marginTop: theme.spacing(4),
      textAlign: 'center',
      '& figcaption': {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body2.fontSize,
        textAlign: 'center',
        marginTop: theme.spacing(1),
        lineHeight: '18px',
      },
    },
    '& figure.float': {
      float: 'left',
      maxWidth: '50%',
      marginRight: theme.spacing(4),
    },
    '& sup': {
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
      top: '-.5em',
    },
  },
  syntaxHighlighter: {
    margin: 0,
    marginTop: theme.spacing(3),
    display: 'block',
    tabSize: 4,
    overflow: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    padding: `${theme.spacing(2)}px !important`,
    color: `${theme.palette.text.primary} !important`,
    boxSizing: 'border-box',
    '-moz-tab-size': 4,
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      backgroundColor: `${getContrastPaperColor(theme)} !important`,
    },
    [theme.breakpoints.down(MIN_WIDTH)]: {
      backgroundColor: ({ inverseColors }) => `${inverseColors
        ? getContrastPaperColor(theme)
        : getInvertedContrastPaperColor(theme)} !important`,
    },
    '& code': {
      whiteSpace: 'pre',
      wordBreak: 'normal',
      wordSpacing: 'normal',
      wordWrap: 'normal',
      background: 'none !important',
      padding: 0,
      '-moz-tab-size': 4,
      tabSize: 4,
      fontSize: ({ readerSettings }) => readerSettings.codeFontSize,
      fontFamily: 'Menlo,Monaco,Consolas,Courier New,Courier,monospace',
    },
    '&::-webkit-scrollbar': {
      height: 12,
      background: theme.palette.background.default,
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      borderRadius: 2,
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
  iframe: {
    width: '100%',
    minWidth: '100%',
    marginTop: theme.spacing(4),
  },
  abbr: {
    borderBottom: `1px dotted ${alpha(theme.palette.divider, 0.5)}`,
    cursor: 'help',
    textDecoration: 'none',
  },
}));

const FormattedText = ({
  children: componentChildren,
  className = '',
  inverseColors = false,
  disableImageZoom = false,
  ...props
}) => {
  const readerSettings = useSelector(store => store.settings.readerSettings);
  const classes = useStyles({ readerSettings, inverseColors });

  const options = {
    replace: ({ name, children, attribs }) => {
      if (name === '&nbsp;') {
        return <> </>;
      }
      if (name === 'code') {
        const firstChild = children[0];
        return (
          <SyntaxHighlighter
            style={getCodeHighlighterStyle(readerSettings.colorScheme)}
            language={firstChild.parent?.attribs?.lang || 'javascript'}
            showLineNumbers={firstChild.parent?.attribs?.linenumbers || false}
            className={classes.syntaxHighlighter}
          >
            {firstChild.data}
          </SyntaxHighlighter>
        );
      }
      if (name === 'img') {
        const imgStyles = {
          width: attribs['data-width'] || attribs.width,
          height: attribs['data-height'] || attribs.height,
        };

        return (
          <LazyLoadImage
            disableZoom={disableImageZoom}
            placeholderSrc={attribs.src}
            // First try to load src from 'data-src' attribute
            // If not found, then use default 'src' attribute
            src={attribs['data-src'] || attribs.src}
            alt={attribs.alt || 'Изображение не загружено'}
            align={attribs.align}
            style={imgStyles}
            className={classes.img}
          />
        );
      }
      if (name === 'div' && attribs.class === 'spoiler') {
        const title = children.find(e => e.attribs && e.attribs.class === 'spoiler_title').children[0]?.data;
        const data = children.find(e => e.attribs && e.attribs.class === 'spoiler_text').children;

        return <Spoiler title={title}>{domToReact(data, options)}</Spoiler>;
      }
      if (name === 'details' && attribs.class === 'spoiler') {
        const title = children.find((e) => e.name === 'summary')
          .children[0]?.data;
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler__content'
        ).children;

        return <Details title={title}>{domToReact(data, options)}</Details>;
      }
      if (name === 'a' && attribs?.href?.startsWith('#')) {
        const handleLinkClick = e => {
          e.preventDefault();
          const el =
            document.getElementById(attribs.href.slice(1)) ||
            document.getElementsByName(attribs.href.slice(1))[0];
          const yOffset = -APP_BAR_HEIGHT;
          const y =
            (el?.getBoundingClientRect()?.top || 0) +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        };

        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <a onClick={handleLinkClick} {...attribs}>
            {domToReact(children, options)}
          </a>
        );
      }
      if (name === 'abbr') {
        return (
          <Tooltip
            title={attribs.title}
            placement="bottom"
            className={classes.abbr}
          >
            <span>{domToReact(children, options)}</span>
          </Tooltip>
        );
      }
      return null;
    },
  };

  const cleanText = sanitize(componentChildren);
  return (
    <div {...props} className={`${classes.text} ${className}`}>
      {parse(cleanText, options)}
    </div>
  );
};

FormattedText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  inverseColors: PropTypes.bool,
  disableImageZoom: PropTypes.bool,
};

export default React.memo(FormattedText);
