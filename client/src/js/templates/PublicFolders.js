import React from 'react';
import FolderButton from '../components/FolderButton';

export default vars => (
  <div className="public-folders">
    {vars.folders.map((folder, key) => <FolderButton key={key} {...folder} />)}
  </div>
);
