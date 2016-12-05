import React, { Component } from 'react';

import template from '../templates/Photo';

export default class Photo extends Component {
  render() {
    return template(this.props);
  }
}
