import React, { Component } from 'react';
import connectStore from '../utils/redux-connector';
import template from '../templates/Main';
import { getMainScrollerImages, getPublicFolders } from '../actions';

class Main extends Component {
  componentDidMount() {
    this.props.dispatch(getMainScrollerImages());
    this.props.dispatch(getPublicFolders());
  }

  render() {
    return template(this.props);
  }
}

export default connectStore(Main);
