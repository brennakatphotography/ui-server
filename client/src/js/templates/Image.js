import React from 'react';
import { PHOTOS_ENDPOINT } from '../const/endpoints';

export default ({ key, image: { id, description } }) => (
  <div className="image" key={key}>
    <img src={`${PHOTOS_ENDPOINT}/${id}`} />
  </div>
);
