import * as React from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ExhibitSkeleton from 'components/skeletons/ExhibitItem';

import ExhibitItem from 'components/blocks/ExhibitItem';
import ErrorComponent from 'components/blocks/Error';

import {
  APP_BAR_HEIGHT,
  DEFAULT_POST_ITEM_HEIGHT,
  FLOWS,
} from 'config/constants';

import { useDispatch, useSelector } from 'react-redux';
import getExhibits from 'store/actions/exhibits';

import useQuery from 'hooks/useQuery';

import MainBlock from 'components/blocks/MainBlock';
import NotFound from 'pages/NotFound';
import Sidebar from 'pages/Home/Sidebar';

import FlowsBar from 'components/blocks/FlowsBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    marginTop: APP_BAR_HEIGHT + 3,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  list: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}));

const Home = () => {
  const query = useQuery();
  const flow = query.get('flow') || 'news';

  if (!FLOWS.some(e => e.alias === flow)) {
    return <NotFound />;
  }

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const classes = useStyles();

  const isFetched = useSelector(state => state.exhibits.fetched);
  const isFetching = useSelector(state => state.exhibits.fetching);
  const fetchError = useSelector(state => state.exhibits.error);

  const exhibits = useSelector(state => state.exhibits.exhibits);

  const getExhibitItemSize = id => {
    return DEFAULT_POST_ITEM_HEIGHT;
  };

  const onFlowsBarLinkClick = e => {
    if (e.alias !== 'news') {
      history.push(`/exhibits?flow=${e.alias}`);
    } else {
      history.push('/exhibits');
    }
  };

  const exhibitsComponents =
    exhibits &&
    exhibits.map(exhibit => (
      <ExhibitItem
        key={exhibit.id}
        getExhibitItemSize={getExhibitItemSize}
        post={exhibit}
      />
    ));

  useEffect(() => {
    dispatch(getExhibits());
  }, [location.pathname, location.search]);

  return (
    <div className={classes.root}>
      <FlowsBar onClick={onFlowsBarLinkClick} flow={flow} />

      <div className={classes.flexContainer}>
        <MainBlock>
          <List className={classes.list}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {isFetching && [...new Array(7)].map((_, i) => <ExhibitSkeleton key={i} />)}
            {isFetched && !fetchError && exhibits && <>{exhibitsComponents}</>}
            {fetchError && <ErrorComponent code={500} message={fetchError} />}
          </List>
        </MainBlock>
        <Sidebar />
      </div>
    </div>
  );
};

export default React.memo(Home);
