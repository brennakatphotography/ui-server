import React from 'react';
import { PHOTOS_ENDPOINT } from '../const/endpoints';
import { getENV } from '../utils/env';

export default ({ key, image: { id, description } }) => (
  <div className="image" key={key}>
    <img src={`${getENV('SERVER')}${PHOTOS_ENDPOINT}/${id}`} />
  </div>
);
