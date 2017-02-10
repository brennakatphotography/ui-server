import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../app/main/components/App';
import Main from '../app/main/components/Main';
import PhotoGroup from '../app/group/components/PhotoGroup';

export default ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main}/>
        <Route path="/groups/:id" component={PhotoGroup}/>
      </Route>
    </Router>
  </Provider>
);
