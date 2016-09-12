import React, { Component } from 'react';
import connectStore from '../helpers/redux-connector';
import template from '../templates/Main';

class Main extends Component {
  render() {
    let { dispatch } = this.props;
    return template({ dispatch });
  }
}

export default connectStore(Main);
