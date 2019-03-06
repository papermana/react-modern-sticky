import React from 'react';
import Sticky from 'react-modern-sticky';

const Offset = () => (
  <div className="wrapper">
    <div className="offset__header" />
    <div className="offset__inner-wrapper">
      <Sticky className="offset__sticky-classname">
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
    </div>
  </div>
);

export default Offset;
