import React from 'react';
import Sticky from 'react-modern-sticky';

const BasicBehavior = () => (
  <div className="wrapper">
    <Sticky
      className="sticky-classname"
      stuckClassName="sticky-classname--stuck"
      data-foo="some-data-attr"
    >
      Sticky content
    </Sticky>
  </div>
);

export default BasicBehavior;
