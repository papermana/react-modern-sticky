import React from 'react';
import Sticky from 'react-modern-sticky';

const UnstuckWhenOutOfView = () => (
  <div className="wrapper">
    <div className="unstuck-when-out-of-view__inner-wrapper">
      <Sticky>
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
    </div>
  </div>
);

export default UnstuckWhenOutOfView;
