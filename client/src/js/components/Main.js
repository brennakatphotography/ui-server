import React, { Component } from 'react';
import connectStore from '../utils/redux-connector';
import template from '../templates/Main';
import { getMainScrollerImages, getGroupFolders } from '../actions';

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
