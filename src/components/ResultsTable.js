import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export default function ResultsTable(props) {
	const {data,variables} = props;

	  if(!(variables && variables.length)){
	  	return ("")
	  }
	  const keys = variables;//Object.keys(data[0])
	  return (
	  	<React.Fragment>
	  	<Typography variant="h5" gutterBottom>Example Results:</Typography>
	  <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          {
          	keys.map((key,idx) => <TableCell key={idx}>{key}</TableCell>)
          }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map( (row, idx) => (
            <TableRow key={idx}>
            {
	          	keys.map((k,idx) => (<TableCell key={idx}>{row[k]}</TableCell>))
            }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
    );
}