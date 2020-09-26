import React from 'react';
import CharacterPage from './CharacterPage';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <CharacterPage />
    </Router>
  )
}

export default App;
