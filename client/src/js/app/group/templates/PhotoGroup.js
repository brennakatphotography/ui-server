import React from 'react';

import Photo from '../components/Photo';

export default ({ images }) => (
  <div className="photo-group">
    {images.map((image, key) => <Photo key={key} {...image} />)}
  </div>
);
