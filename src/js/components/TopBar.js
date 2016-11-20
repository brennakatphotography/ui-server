import React, { Component } from 'react';
import connectStore from '../utils/redux-connector';
import template from '../templates/TopBar';

class TopBar extends Component {
  render() {
    let { children } = this.props;
    return template({ children });
  }
}

export default connectStore(TopBar);
