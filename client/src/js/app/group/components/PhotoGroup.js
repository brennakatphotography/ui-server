import React, { Component } from 'react';

import { connectStore } from '../../../utils/redux';
import { getGroupImages } from '../actions';
import template from '../templates/PhotoGroup';

class PhotoGroup extends Component {
  componentDidMount() {
    const { dispatch, routeParams: { id } } = this.props;
    dispatch(getGroupImages(id));
  }

  render() {
    return template(this.props);
  }
}

export default connectStore(PhotoGroup);
