import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BasicBehavior from './BasicBehavior';
import Offset from './Offset';
import FunctionAsChild from './FunctionAsChild';
import './index.css';

const App = () => (
  <Router>
    <div>
      <Route path="/basic-behavior" component={BasicBehavior} />
      <Route path="/offset" component={Offset} />
      <Route path="/function-as-child" component={FunctionAsChild} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
