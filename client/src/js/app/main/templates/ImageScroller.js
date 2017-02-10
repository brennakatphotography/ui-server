import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Image from '../components/Image';

export default ({ images }) => (
  <div>
    <ReactCSSTransitionGroup
      className="image-scroller"
      transitionName="image-scroll"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
    >
      {images.map(image => <Image key={image.id} image={image}/>)}
    </ReactCSSTransitionGroup>
  </div>
);
