import React, { Component } from 'react';

import template from '../templates/TopBar';

export default class TopBar extends Component {
  render() {
    return template(this.props);
  }
}
