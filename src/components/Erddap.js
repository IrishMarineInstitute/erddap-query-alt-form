import React from 'react';
import ErddapClient from '../ErddapClient'
import DataAccessForm from './DataAccessForm'
import { Select, MenuItem, Box, FormLabel, FormControl } from '@material-ui/core';


class Erddap extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			server: props.server || 'https://erddap.marine.ie/erddap/',
			datasets: [],
			dataset: 0
		}
		this.onDatasetChanged = this.onDatasetChanged.bind(this);
	}
     
    onDatasetChanged(event){
	    this.setState({dataset: event.target.value})
    }

	componentDidMount() {
		let erddap = new ErddapClient(this.state.server);
		this.setState({erddap: erddap});
		erddap.listDatasets().then((datasets) =>{
			this.setState({datasets: datasets})
		})
    }

	render() {
		const {datasets,erddap,dataset} = this.state;
		const options = datasets.map((dataset_id) =>
  			<MenuItem key={dataset_id} value={dataset_id}>{dataset_id}</MenuItem>
  		);
  		const choose = (datasets && datasets.length)?"Choose...":"Loading...";
		return (
		<React.Fragment>
		            <Box display="block">
            <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Dataset</FormLabel>

		<Select value={dataset} onChange={this.onDatasetChanged} >
		    <MenuItem value="0" key="choose..." selected>{choose}</MenuItem>
			{options}
		</Select>
		</FormControl>
		</Box>
		<DataAccessForm erddap={erddap} dataset_id={dataset}/>
		</React.Fragment>
		);
	}
}

export default Erddap