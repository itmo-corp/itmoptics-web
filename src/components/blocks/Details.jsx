import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getInvertedContrastPaperColor from 'utils/getInvertedContrastPaperColor';

import Spoiler from './Spoiler';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    background: getInvertedContrastPaperColor(theme),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    padding: theme.spacing(2),
    '& figcaption': {
      color: theme.palette.text.hint,
      fontSize: 14,
      lineHeight: '18px',
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    '& figure': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
}));

// eslint-disable-next-line react/prop-types
const Details = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Spoiler title={title}>{children}</Spoiler>
    </div>
  );
};

export default React.memo(Details);
