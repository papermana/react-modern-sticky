import React from 'react';
import Sticky from 'react-modern-sticky';

const OffsetViaProp = () => (
  <div className="wrapper">
    <div className="offset__header" />
    <div className="offset__inner-wrapper">
      <Sticky offset={50}>
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
    </div>
  </div>
);

export default OffsetViaProp;
