import React from 'react';
import 'normalize.css';
import './App.css';
import Erddaps from './components/Erddaps'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
// https://irishmarineinstitute.github.io/awesome-erddap/erddaps.js
function App() {
  return (
        <React.Fragment>
      <CssBaseline />
    <Container>
  	<MuiPickersUtilsProvider utils={DateFnsUtils}>
	    <div className="App">
	      <header className="App-header">
	        <Erddaps />
	      </header>
	    </div>
    </MuiPickersUtilsProvider>
    </Container>
    </React.Fragment>
  );
}

export default App;
