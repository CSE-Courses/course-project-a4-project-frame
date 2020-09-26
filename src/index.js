import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GamesList from './GamesList';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <GamesList />,
  </Router>,
  document.getElementById('root')
);

