import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';

import App from './app/main/components/App';
import { middleware, redux, wiredApp } from './utils';
import Main from './app/main/components/Main';
import PhotoGroup from './app/group/components/PhotoGroup';

const reducers = redux.makeStore({ routing: routerReducer });
const store = createStore(reducers,
  applyMiddleware(...middleware)
);
const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', () => {
  render(
    wiredApp({ history, store }),
    document.getElementById('app'));
});
