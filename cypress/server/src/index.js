import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BasicBehavior from './BasicBehavior';
import FunctionAsChild from './FunctionAsChild';
import Offset from './Offset';
import OffsetViaProp from './OffsetViaProp';
import UnstuckWhenOutOfView from './UnstuckWhenOutOfView';
import Callback from './Callback';
import './index.css';

const App = () => (
  <Router>
    <div>
      <Route path="/basic-behavior" component={BasicBehavior} />
      <Route path="/function-as-child" component={FunctionAsChild} />
      <Route path="/offset" component={Offset} />
      <Route path="/offset-via-prop" component={OffsetViaProp} />
      <Route
        path="/unstuck-when-out-of-view"
        component={UnstuckWhenOutOfView}
      />
      <Route path="/callback" component={Callback} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
