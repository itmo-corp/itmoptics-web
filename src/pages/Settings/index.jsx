import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { alpha, Typography, useTheme } from '@material-ui/core';
import OutsidePage from 'components/blocks/OutsidePage';
import isDarkTheme from 'utils/isDarkTheme';
import { MIN_WIDTH } from 'config/constants';
import LinkToOutsidePage from 'components/blocks/LinkToOutsidePage';

import {
  Image,
  Hide,
  ChevronRight,
  Category,
  Document,
  Chat,
  ShieldDone,
  Download,
} from 'react-iconly';

const items = [
  {
    icon: Image,
    to: '/appearance',
    text: 'Внешний вид',
  },
  {
    icon: Document,
    to: '/reader',
    text: 'Параметры чтения',
  },
  {
    icon: ShieldDone,
    to: '/privacy',
    text: 'Приватность',
  },
  {
    icon: Chat,
    to: '/language',
    text: 'Настройки языка',
  },
  {
    icon: Download,
    to: '/import',
    text: 'Импорт настроек',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      padding: theme.spacing(1, 0),
      borderRadius: 8,
    },
  },
  link: {
    display: 'flex',
    padding: theme.spacing(1.5, 2),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    alignItems: 'center',
    '-webkit-tap-highlight-color': 'transparent !important',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'], 0.05),
    },
    '&:active': {
      background: alpha(theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'], 0.2),
    },
  },
  linkText: {
    marginLeft: theme.spacing(1.5),
    fontSize: 16,
    flexGrow: 1,
  },
  linkIcon: {
    color: theme.palette.primary.main,
  },
  linkIconChevronRight: {
    color: theme.palette.text.hint,
  },
}));

const Settings = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <OutsidePage
      headerText="Настройки"
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        {items.map((e) => (
          <LinkToOutsidePage to={`/settings${e.to}`} key={e.to} className={classes.link}>
            <e.icon className={classes.linkIcon} set="light" size={28} />
            <Typography className={classes.linkText}>{e.text}</Typography>
            <ChevronRight className={classes.linkIconChevronRight} set="light" size={18} />
          </LinkToOutsidePage>
        ))}
      </div>
    </OutsidePage>
  );
};

export default React.memo(Settings);
