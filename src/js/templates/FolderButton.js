import React from 'react';

export default vars => (
  <div className="button-with-tool-tip">
    <span className="folder-button">{vars.name}</span>
    <span>{vars.description}</span>
  </div>
);
