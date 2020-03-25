import React from 'react';
import MultiSelectSort from './MultiSelectSort';
import FieldFilters from './FieldFilters';
import ResultsTable from './ResultsTable';
import {debounce} from 'lodash';
import TabledapFormats from './TabledapFormats';
import { Select, MenuItem, Box, Typography } from '@material-ui/core';

class QueryConstructorForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			variables: [],
			filters: []
		}
		this.setSelected = this.setSelected.bind(this);
		this.onFiltersChanged = this.onFiltersChanged.bind(this);
	}


	setSelected(selected){
		this.setState({variables: selected});
		selected.forEach(variable=>{
			if(this.props.dataset._meta.subsetVariables.indexOf(variable)>=0){
				this.props.dataset.prepareSubset(variable);
			}
		})
		this.props.onChange(selected, this.state.filters);
	}

	onFiltersChanged(filters){
		this.setState({filters: filters});
		this.props.onChange && this.props.onChange(this.state.variables, filters);
	}

	componentDidUpdate(prevProps){
		if(prevProps.dataset !== this.props.dataset){
			this.setState({variables: []});}

	}

	render(){
		const {dataset, metadata} = this.props;
		const {variables} = this.state;
		if(metadata){
			const map = (field)=>{return {value: field, label: field, selected: variables.indexOf(field)>=0}};

			const options = variables.map(map);
			metadata._fieldnames.filter(field=>variables.indexOf(field)<0).map(map).forEach(option=>options.push(option));
			
			return (<React.Fragment>
				<MultiSelectSort 
				dataset={dataset} 
				selected={options.filter(o=>variables.indexOf(o.value)>=0)} 
				options={options} 
				onChange={selected => this.setSelected(selected?selected.map(o=>o.value):[])} 
				placeholder={<p>Select some fields...</p>}/>

				{variables.length > 0 &&
					<FieldFilters onFiltersChanged={this.onFiltersChanged} variables={variables} metadata={metadata}/>
				}
				</React.Fragment>)
  		}
return (<h1>sorry, no metadata</h1>)
	}
}
function QueryLink(props){
	const {dataset,variables,filters} = props;
	const [format, setFormat] = React.useState("__choose__");
		const onChange = (e,value) =>{
            setFormat(e.target.value);
        };
		const options = TabledapFormats.map((format) =>
  			<MenuItem key={format.value} value={format.value}>{format.label}</MenuItem>
  		);
  		if(!(variables && variables.length)){
  			return "";
  		}
		const parts = [variables.join(",")];
		const displayparts = [variables.join(",")];
		if(filters && filters.length){
			parts.push(filters.map(filter=>encodeURIComponent(filter.uri_component)).join("&"))
			displayparts.push(filters.map(filter=>filter.uri_component).join("&"))
		}
		const base_url = dataset.getDataUrl(format==="__choose__"?".htmlTable":format);
		const uri_component = base_url+parts.join("&");
		const uri_display = base_url+displayparts.join("&");
	return (
	<React.Fragment>
	  	<Typography variant="h5" gutterBottom>Download Link:</Typography>
		<Box m={1} key="Download Format" component="div" display="block">
		<Select value={format} onChange={onChange}>
			<MenuItem key="__choose__" value="__choose__" >Choose Download File Format...</MenuItem>
		{options}
		</Select>
		</Box>
		<a key="downloadLink" href={uri_component}>{uri_display}</a>
	</React.Fragment>
	);
}
class DataAccessForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dataset: false,
			metadata: false,
			data: [],
			variables: [],
			filters: [],
			queryno: 0
		}
		this.onChange = debounce(this.onChange.bind(this),500);
		this.onDataFetched = this.onDataFetched.bind(this);
		this.noDataFetched = this.noDataFetched.bind(this);
	}

	onChange = function(variables,filters){
		const {dataset,queryno} = this.state;
		let parts = [variables.join(",")]
		if(filters && filters.length){
			parts.push(filters.map(filter=>encodeURIComponent(filter.uri_component)).join("&"))
		}
		parts.push(encodeURIComponent('orderByLimit("5")'))
		let uri_component = parts.join("&");
		//console.log(decodeURIComponent(uri_component), dataset);
		let newqueryno = queryno + 1;
		this.setState({variables: variables, filters: filters, queryno: newqueryno,  data: []});
		dataset.fetchData(uri_component).then(this.onDataFetched.bind(this,newqueryno)).catch(this.noDataFetched.bind(this,newqueryno));
	}

	onDataFetched = function(queryno,data){
		console.log(this.state.queryno,queryno);
		if(this.state.queryno === queryno){
			this.setState({data: data});
		}
	}
	noDataFetched = function(queryno,err){
		console.log(this.state.queryno,queryno);
		if(this.state.queryno === queryno){
			this.setState({data: []});
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.dataset_id !== this.props.dataset_id){
			this.setState({
			dataset: false,
			metadata: false,
			data: [],
			variables: [] });
			if(this.props.dataset_id === "0"){
				return;
			}
			const dataset = this.props.erddap.dataset(this.props.dataset_id);
			dataset.fetchMetadata().then(function(metadata){
				console.log(metadata);
				this.setState({dataset: dataset, metadata: metadata, data: []});
			}.bind(this))
		}
	}
	render(){
		const {dataset_id} = this.props;
		const {dataset,metadata,data,variables,filters} = this.state;
		if(dataset_id === "0" || !dataset_id)  {
			return(<div></div>)
		}
		if(!dataset){
			return(<div>loading {dataset_id}</div>)
		}
		return(
		<React.Fragment>
			<QueryConstructorForm onChange={this.onChange} dataset={dataset} metadata={metadata}/>
			<ResultsTable data={data} variables={variables}/>
			<QueryLink variables={variables} filters={filters} dataset={dataset}/>
		</React.Fragment>
		)

	}
}

export default DataAccessForm