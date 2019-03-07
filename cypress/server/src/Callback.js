import React, { useState } from 'react';
import Sticky from 'react-modern-sticky';

const Callback = () => {
  const [callbackResults, setCallbackResults] = useState(false);
  const handleStuck = status =>
    setCallbackResults(status ? 'callback: stuck' : 'callback: not stuck');

  return (
    <div className="wrapper">
      <Sticky onStuck={handleStuck}>
        {({ isStuck }) => (isStuck ? 'is stuck' : 'is not stuck')}
      </Sticky>
      {callbackResults !== null && callbackResults}
    </div>
  );
};

export default Callback;
