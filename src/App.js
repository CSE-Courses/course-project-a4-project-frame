import React from 'react';
import CharacterForm from './CharacterForm';
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <CharacterForm />
    </Router>
  )
}

export default App;
