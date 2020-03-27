import React from 'react';
import 'normalize.css';
import './App.css';
import Erddaps from './components/Erddaps'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// https://irishmarineinstitute.github.io/awesome-erddap/erddaps.js
function App() {
  return (
  	<MuiPickersUtilsProvider utils={DateFnsUtils}>
	    <div className="App">
	      <header className="App-header">
	        <Erddaps />
	      </header>
	    </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
