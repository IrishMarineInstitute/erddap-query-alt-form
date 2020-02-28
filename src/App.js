import React from 'react';
import 'normalize.css';
import './App.css';
import Erddap from './components/Erddap'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Erddap server="https://erddap.marine.ie/erddap/" />
      </header>
    </div>
  );
}

export default App;
