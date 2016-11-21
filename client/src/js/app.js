import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import makeReducers from './reducers';
import dispatchMiddleware from './utils/dispatchMiddleware';
import logger from './utils/logger';

import App from './components/App';
import Main from './components/Main';

const reducers = makeReducers({ routing: routerReducer });
let store = createStore(reducers,
  applyMiddleware(dispatchMiddleware, logger)
);

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Main}/>
          </Route>
        </Router>
      </div>
    </Provider>,
    document.getElementById('app')
  );
});
