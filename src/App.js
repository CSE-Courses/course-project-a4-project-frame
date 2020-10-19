import React, {useEffect, useState} from 'react';
import RouterPage from './MyRouter';
import {BrowserRouter as Router} from 'react-router-dom';
import Axios from 'axios';


function App() {

  // useEffect(() => {
  //   Axios.get('http://localhost:3001/api/get').then((respone) => {
  //     console.log(respone.data);
  //     //setCharacterNames(respone.data);
  //   })
  // }, [])

  return (
    <Router>
      <RouterPage />
    </Router>
  )
}

export default App;
