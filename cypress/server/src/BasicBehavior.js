import React from 'react';
import Sticky from 'react-modern-sticky';

const BasicBehavior = () => (
  <div className="wrapper">
    <Sticky
      className="sticky-classname"
      stuckClassName="sticky-classname--stuck"
      data-foo="some-data-attr"
      style={{ backgroundColor: 'rgb(0, 0, 255)' }}
    >
      Sticky content
    </Sticky>
  </div>
);

export default BasicBehavior;
