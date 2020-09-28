import React, { Fragment } from 'react';
import './App.scss';

import Header from './components/Header';
import Table from './components/Table';

const NormalData = [
  {
    number: "Jab 1",
    damage: '400',
    startup: '6',
    active: '6',
    recovery: '-2',
    frame: '-2'
  },
  {
    number: 'Jab 2',
    damage: '300 Initial, 200 after Gut Punch',
    startup: '10',
    active: '8',
    recovery: '-15',
    frame: '-2'
  },
  {
    number: 'Down Tilt',
    damage: '800',
    startup: '13',
    active: '9',
    recovery: '-10',
    frame: '-7'
  },
  {
    number: 'Up Tilt',
    damage: '1100',
    startup: '14',
    active: '11',
    recovery: '-13',
    frame: '-8'
  },
  {
    number: 'Side Tilt',
    damage: '400',
    startup: '24',
    active: '6',
    recovery: '-5',
    frame: '-2'
  },
  {
    number: "Running Jab",
    name: '20',
    startup: '8',
    active: '5',
    recovery: '-2',
    frame: '1(-1), 1 from far range, -1 from point blank'
  },
];

const SpecialData = [
  {
    name: 'Interceptor Kick',
    image: 'NA',
    startup: '17',
    recovery: '13',
    frame: '0',
  },
  {
    name: 'Super Dash Kick',
    image: 'NA',
    startup: '12',
    recovery: '-36',
    frame: '-3'
  },
  {
    name: 'Crushing Knee Kick',
    image: "NA",
    startup: '22',
    recovery: '23',
    frame: '-8',
  },
  {
    name: 'Consecutive Energy Blast',
    image:'NA',
    startup: '5',
    recovery: '6',
    frame: '-12'
  },
  {
    name: 'Big Bang Attack',
    image: 'NA',
    country: 'Germany',
    length: 4.574,
    numberOfLaps: 67
  },
  {
  name: 'Final Smash' ,
  image:'NA',
  startup: '12+3',
  recovery: '50',
  frame: '-34',
  }

]

function App() {
  return (
    <Fragment>
      <Header title="Dr.Mario" />
      <Table 
        tableData={NormalData} 
        headingColumns={['Name', 'Damage', 'Startup', 'Active', 'Recovery', 'Frame Advantage']} 
        title="Frame Data" 
      />
      <Table 
        tableData={SpecialData} 
        headingColumns={['Name', 'Image', 'Startup', 'Active', 'Recovery']} 
        title="Special Attacks" 
        breakOn="small"
      />
    </Fragment>
  );
}

export default App;