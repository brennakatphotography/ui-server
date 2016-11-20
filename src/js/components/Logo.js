import React, { Component } from 'react';
import connectStore from '../utils/redux-connector';
import template from '../templates/Logo';

class Logo extends Component {
  render() {
    return template();
  }
}

export default connectStore(Logo);
