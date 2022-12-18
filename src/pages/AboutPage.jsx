import React from 'react';
import { Typography, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OutsidePage from 'components/blocks/OutsidePage';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  text: {
    marginTop: theme.spacing(4),
    fontFamily: 'Google Sans',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    transitionDuration: '0.1s',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  cross: {
    textDecoration: 'line-through',
    color: theme.palette.text.hint,
  },
  grid: {
    marginTop: theme.spacing(2),
  },
}));

const useCardStyles = makeStyles(theme => ({
  root: {
    borderRadius: 8,
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 12%), 0px 2px 2px 0px rgb(0 0 0 / 7%), 0px 1px 5px 0px rgb(0 0 0 / 4%)',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 500,
    marginLeft: theme.spacing(2),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
}));

// eslint-disable-next-line react/prop-types
const Card = ({ to, title, iconSrc, subtitle, medium, small }) => {
  const classes = useCardStyles();
  let xs;
  let md;
  if (medium) {
    xs = 8;
  } else {
    xs = small ? 4 : 12;
  }
  if (medium) {
    md = 4;
  } else {
    md = small ? 2 : 6;
  }

  return (
    <Grid item xs={xs} md={md}>
      <a className={classes.link} href={to} target="_blank" rel="noreferrer">
        <Paper className={classes.root} elevation={2}>
          <div className={classes.row}>
            <img className={classes.icon} src={iconSrc} alt={title} />
            <Typography className={classes.title}>{title}</Typography>
          </div>
          {subtitle && <Typography className={classes.subtitle}>{subtitle}</Typography>}
        </Paper>
      </a>
    </Grid>
  );
};

const AboutPage = () => {
  const classes = useStyles();

  return (
    <OutsidePage headerText="Об IT[M]Optics" disableShrinking hidePositionBar>
      <Container className={classes.root}>
        <Typography className={classes.text} variant="h4">
          Bla bla!
        </Typography>
        <Typography className={classes.text} style={{ fontSize: 22, lineHeight: '32px' }}>
          Bla{' '}
          <Link className={classes.link} to="/">
            IT[M]Optics
          </Link>{' '}
          - bla bl bla.
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, lineHeight: '28px', maxWidth: 1000 }}
        >
          Bla{' '}
          <span className={classes.cross}>(bla)</span> bla.
        </Typography>
        <Typography className={classes.text} style={{ fontSize: 18, lineHeight: '28px' }}>
          Blablabla
        </Typography>

        <Grid container spacing={2} className={classes.grid}>
          <Card
            iconSrc="https://img.icons8.com/material-outlined/24/000000/github.png"
            title="GitHub"
            to="https://github.com/itmo-corp"
            subtitle="Организация на GitHub"
          />
          <Card
            iconSrc="https://img.icons8.com/doodle/48/000000/vk-messenger.png"
            title="VK"
            to="https://vk.com/itmoptics/"
            subtitle="Группа VK"
          />
        </Grid>
        <Typography className={classes.text} style={{ fontSize: 18, lineHeight: '28px' }}>
          Bla bla bla <span className={classes.cross}>bla</span> bla.
        </Typography>
        <Typography className={classes.text} style={{ fontSize: 18, lineHeight: '28px' }}>
          Bla bla
        </Typography>
      </Container>
    </OutsidePage>
  );
};

export default React.memo(AboutPage);
