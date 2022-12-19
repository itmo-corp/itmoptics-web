import React from 'react';
import SideBlock from 'components/blocks/SideBlock';
import Sidebar from 'components/blocks/Sidebar';
import { makeStyles, lighten, darken, alpha } from '@material-ui/core/styles';
import LinkToOutsidePage from 'components/blocks/LinkToOutsidePage';
import PropTypes from 'prop-types';
import postSidebarData from 'config/constants/postSidebarData';

const ld = { lighten, darken };

const usePostItemStyles = makeStyles(theme => ({
  root: {
    background: 'transparent',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
    '&:first-child': {
      marginTop: 0,
      paddingTop: 0,
      borderTop: 'none',
    },
  },
  title: {
    color: theme.palette.text.primary,
    '&:visited > p': {
      color: ld[`${theme.palette.type}en`](theme.palette.text.primary, 0.4),
    },
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 15,
    marginTop: hasImage => (hasImage ? 0 : theme.spacing(1)),
    textDecoration: 'none !important',
    marginBottom: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: theme.spacing(3),
  },
}));

const ExhibitItem = ({ title, link }) => {
  const classes = usePostItemStyles();

  return (
    <div className={classes.root}>
      <LinkToOutsidePage className={classes.title} to={link}>
        {title}
      </LinkToOutsidePage>
    </div>
  );
};

ExhibitItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const PostSidebar = () => {
  return (
    <Sidebar>
      <SideBlock title="Читают сейчас">
        {postSidebarData.map(e => (
          <ExhibitItem title={e.title} link={e.link} key={e.title} />
        ))}
      </SideBlock>
    </Sidebar>
  );
};

export default PostSidebar;
