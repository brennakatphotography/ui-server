import React, { Component } from 'react';
import template from '../templates/ImageScroller';
import cycleItems from '../utils/cycleItems';

export default class ImageScroller extends Component {
  componentWillReceiveProps({ images }) {
    const action = images => this.setState({ images: images.slice(0, 2) });
    if (this.cycleItems) this.cycleItems.cancel();
    this.cycleItems = cycleItems(action, 5000);
    this.cycleItems(images);
  }

  componentWillUnmount() {
    if (this.cycleItems) this.cycleItems.cancel();
  }

  render() {
    let { images } = this.state || {};
    return template(images || []);
  }
}
