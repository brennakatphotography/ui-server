import React from 'react';

import ImageCollectionLink from '../components/ImageCollectionLink';

export default ({ groups }) => (
  <div className="photo-groups">
    {groups.map((group, key) => <ImageCollectionLink key={key} {...group} />)}
  </div>
);
