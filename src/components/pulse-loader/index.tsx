import React from 'react';
import './index.scss';

function PulseLoader() {
  return (
    <div className="pulse-loader">
      <div className="ring" />
      <div className="ring" />
      <div className="ring" />
    </div>
  );
}

export default PulseLoader;
