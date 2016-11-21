import React from 'react';
import TopBar from '../components/TopBar';

export default ({ children }) => (
  <div className="app-container">
    <TopBar />
    {children}
  </div>
);
