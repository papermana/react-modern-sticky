import React from 'react';
import Sticky from 'react-modern-sticky';

const OffsetViaProp = () => (
  <div className="wrapper">
    <div className="header" />
    <div className="inner-wrapper">
      <Sticky offset={50}>
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
    </div>
  </div>
);

export default OffsetViaProp;
