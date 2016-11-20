import React, { Component } from 'react';
import template from '../templates/Image';

export default class Image extends Component {
  render() {
    return template(this.props);
  }
}
