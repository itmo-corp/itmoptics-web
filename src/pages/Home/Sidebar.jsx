import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import SideBlock from 'components/blocks/SideBlock';
import Sidebar from 'components/blocks/Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, lighten, darken, alpha } from '@material-ui/core/styles';
import LinkToOutsidePage from 'components/blocks/LinkToOutsidePage';

import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import purple from '@material-ui/core/colors/purple';
import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import getPostLink from 'utils/getPostLink';
import parse from 'html-react-parser';
import formatNumber from 'utils/formatNumber';

import { Link } from 'react-router-dom';

const ld = { lighten, darken };
const useSkeletonStyles = makeStyles(theme => ({
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 8,
  },
}));

const useStyles = makeStyles(theme => ({
  groupsChildrenContainerProps: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginTop: 12,
    width: '100%',
  },
}));

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
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bottomRowItem: {
    color: theme.palette.text.hint,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
  },
  bottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  bottomRowItemText: {
    fontSize: 13,
    fontWeight: 600,
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

const useGroupItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none !important',
    background: 'transparent !important',
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
    '&:first-child': {
      marginTop: 0,
    },
  },
  photo: {
    marginRight: theme.spacing(1.5),
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
  },
  followers: {
    marginLeft: 'auto',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
    color: theme.palette.type === 'dark' ? purple[200] : purple.A700,
  },
}));

const GroupItem = ({ data }) => {
  const classes = useGroupItemStyles();
  const groupLink = `/group/${data.alias}`;

  return (
    <LinkToOutsidePage className={classes.root} to={groupLink}>
      <img className={classes.photo} alt={data.alias} src={data.photo} />
      <span className={classes.title}>{parse(data.alias)}</span>
    </LinkToOutsidePage>
  );
};

GroupItem.propTypes = {
  data: PropTypes.object.isRequired,
};

const PostItem = ({ data }) => {
  const classes = usePostItemStyles();
  const postLink = getPostLink(data);
  const { reads } = data;
  const readsNum = formatNumber(reads);

  return (
    <div className={classes.root}>
      <LinkToOutsidePage className={classes.title} to={postLink}>
        {data.title}
      </LinkToOutsidePage>

      <div className={classes.bottomRow}>
        <div className={classes.bottomRowItem}>
          <VisibilityIcon className={classes.bottomRowItemIcon} />
          <span className={classes.bottomRowItemText}>{readsNum}</span>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  data: PropTypes.object.isRequired,
};

const HomeSidebar = () => {
  const classes = useStyles();

  const topGroups = [
    {
      id: 1,
      alias: 'IT[M]Optics its about blblblblblblbl afjdfn kjsbfngkn jfn gjdfn jjn g',
      photo: 'https://sun9-12.userapi.com/impg/BbUJGqTFS5HPmnzWHTl4YQ7x0GDwsT_4EFSbww/--OZqAqu88E.jpg?size=1080x1080&quality=96&sign=1c4eb2c1fdad9e277c22f5a5e0bbcaf6&type=album',
    },
    {
      id: 2,
      alias: 'Me',
      photo: 'https://pbs.twimg.com/profile_images/822462674839699456/yEbz4yAt_400x400.jpg',

    },
  ];

  const mostReading = [
    {
      id: 1,
      title: 'TopPost1',
      reads: 12,
    },
    {
      id: 2,
      title: 'TopPost2',
      reads: 300,
    },
  ];

  return (
    <Sidebar>
      <SideBlock
        childrenContainerProps={{
          className: classes.groupsChildrenContainerProps,
        }}
        title="Рекомендуемые материалы"
      >
        {topGroups.slice(0, 5).map(group => (
          <GroupItem data={group} key={group.id} />
        ))}
      </SideBlock>
      <SideBlock title="Популярные экспонаты">
        {mostReading.slice(0, 5).map(post => (
          <PostItem data={post} key={post.id} />
        ))}
      </SideBlock>
    </Sidebar>
  );
};

export default HomeSidebar;
