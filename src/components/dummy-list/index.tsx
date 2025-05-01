import React from 'react';
import './index.scss';

function DummyList({ length }: { length: number }) {
  return (
    <ul className="dummy-list">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="dummy-list-item" />
      ))}
    </ul>
  );
}

export default DummyList;
