import React from 'react';
import RouterPage from './MyRouter';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <RouterPage />
    </Router>
  )
}

export default App;
