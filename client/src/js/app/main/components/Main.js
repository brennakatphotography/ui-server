import React, { Component } from 'react';

import { connectStore } from '../../../utils/redux';
import { getMainScrollerImages, getGroupFolders } from '../actions';
import template from '../templates/Main';

class Main extends Component {
  componentDidMount() {
    this.props.dispatch(getMainScrollerImages());
    this.props.dispatch(getGroupFolders());
  }

  render() {
    return template(this.props);
  }
}

export default connectStore(Main);
