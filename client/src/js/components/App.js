import React, { Component } from 'react';
import connectStore from '../utils/redux-connector';
import template from '../templates/App';

class App extends Component {
  render() {
    let { children } = this.props;
    return template({ children });
  }
}

export default connectStore(App);
