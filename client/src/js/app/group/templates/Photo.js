import React from 'react';

export default ({ description, name, src }) => (
  <div className="photo">
    <img src={src} alt={name} />
    <p>{name}</p>
    <p>{description}</p>
  </div>
);
