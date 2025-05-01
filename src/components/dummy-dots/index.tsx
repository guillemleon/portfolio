import React from 'react';
import './index.scss';

function DummyDots({ length }: { length: number }) {
  return (
    <ul className="dummy-dot-container">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="dummy-dot" />
      ))}
    </ul>
  );
}

export default DummyDots;
