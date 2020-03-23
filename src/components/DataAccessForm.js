import React from 'react';
import MultiSelectSort from './MultiSelectSort';
import FieldFilters from './FieldFilters';
import ResultsTable from './ResultsTable';
import {debounce} from 'lodash';

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
class QueryResults extends React.Component{
	render(){
		return(<h1>hello</h1>)
	}
}
class DataAccessForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dataset: false,
			metadata: false,
			data: [],
			variables: [],
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
		this.setState({variables: variables, queryno: newqueryno,  data: []});
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
		const {dataset,metadata,data,variables} = this.state;
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
		</React.Fragment>
		)

	}
}

export default DataAccessForm