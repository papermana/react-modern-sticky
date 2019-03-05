import React from 'react';
import Sticky from 'react-modern-sticky';

const Offset = () => (
  <div className="wrapper">
    <div className="header" />
    <div className="inner-wrapper">
      <Sticky className="sticky-classname sticky-classname--with-offset">
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
    </div>
  </div>
);

export default Offset;
