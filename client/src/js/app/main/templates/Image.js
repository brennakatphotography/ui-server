import React from 'react';

import { photoSrc } from '../../../const/endpoints';

export default ({ key, image: { id, description } }) => (
  <div className="image" key={key}>
    <img src={photoSrc(id)} />
  </div>
);
