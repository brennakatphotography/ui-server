import React from 'react';
import TopBar from '../components/TopBar';
import ImageScroller from '../components/ImageScroller';
import PublicFolders from '../components/PublicFolders';

export default vars => (
  <div className="main-container">
    <ImageScroller images={vars.bannerImages} />
    {/*}<PublicFolders folders={vars.folders} />*/}
    {/*<div>Whatever is beneath</div>*/}
  </div>
);
