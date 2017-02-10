import React from 'react';
import { Link } from 'react-router';

export default ({ src, name, page }) => (
  <div className="image-collection">
    <Link to={page}>
      <div className="image-link" style={{ backgroundImage: `url(${src})` }}>
        <span className="image-text">{name}</span>
      </div>
    </Link>
  </div>
);
