import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'store';

import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import calendarPlugin from 'dayjs/plugin/calendar';
import updateLocalePlugin from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';

import 'react-photoswipe/dist/photoswipe.css';

import App from 'components/App';

import * as userSettingsUtils from 'utils/userSettings';

import reportWebVitals from './reportWebVitals';

import swConfig from './config/serviceWorkerConfig';
import * as serviceWorker from './serviceWorker';

const userSettings = userSettingsUtils.get();

dayjs.locale(userSettings.language.interface || 'ru');
dayjs.extend(relativeTimePlugin);
dayjs.extend(calendarPlugin);
dayjs.extend(updateLocalePlugin);

dayjs.updateLocale('ru', {
  calendar: {
    lastWeek: 'D MMMM, в hh:mm',
    sameDay: 'Сегодня, в hh:mm',
    lastDay: 'Вчера, в hh:mm',
    sameElse: 'DD.MM.YYYY, в hh:mm',
  },
});

dayjs.updateLocale('en', {
  calendar: {
    lastWeek: 'D MMMM[, at] hh:mm',
    sameDay: '[ Today, at] hh:mm',
    lastDay: '[ Yesterday, at] hh:mm',
    sameElse: 'DD.MM.YYYY[, at] hh:mm',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
serviceWorker.register(swConfig);
