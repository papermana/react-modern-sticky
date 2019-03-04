import React from 'react';
import Sticky from 'react-modern-sticky';

const FunctionAsChild = () => (
  <div className="wrapper">
    <Sticky>
      {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
    </Sticky>
  </div>
);

export default FunctionAsChild;
