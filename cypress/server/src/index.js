import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BasicBehavior from './BasicBehavior';
import './index.css';

const App = () => (
  <Router>
    <div>
      <Route path="/basic-behavior" component={BasicBehavior} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
