import React from 'react';
import Gantt from '../gantt';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Fake } from './../gantt/Fake';

const App: React.FC = () => {

  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/fake/">Fake</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Gantt} />
        <Route path="/fake/:id" component={Fake} />
      </>
    </Router>
  );
}

export default App;
