import React from 'react';
import GamesPage from './MyRouter';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <GamesPage />
    </Router>
  )
}

export default App;
