import React from 'react';

import ImageScroller from '../components/ImageScroller';
import PublicFolders from '../components/PublicFolders';

export default ({ bannerImages, groups }) => (
  <div className="main-container">
    <ImageScroller images={bannerImages} />
    <div className="after-image-scroller">
      <PublicFolders groups={groups} />
    </div>
  </div>
);
