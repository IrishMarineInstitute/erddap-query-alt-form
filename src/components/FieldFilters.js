import React, {useState} from 'react';
import FieldFilter from './FieldFilter';
import {Box} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';

export default function FieldFilters(props){
	const [filtering, setFiltering] = useState(null);
	const [filters, setFilters] = useState([{key: Math.random()}])
	const {variables, metadata, onFiltersChanged} = props;
	const addFilter = (filter)=>{setFilters([...filters,{key: Math.random()}]);}
	const deleteFilter = (filter)=>{
		let filters2 = filters.filter((v)=>v.key!==filter.key)
		setFilters(filters2);
		onFiltersChanged && onFiltersChanged(filters2.filter(filter=>filter.uri_component));
	};
	const onValueAssigned = (filter,variable,constraint,value)=>{
		const filters2 = [...filters];
		filters2.forEach((f)=>{
			if(f.key === filter.key){
				if(value.length){
					f.variable = variable;
					f.constraint = constraint;
					f.value = value;
					f.uri_component = metadata.encode(variable,constraint,value);
				}else{
					delete f.variable;
					delete f.constraint;
					delete f.value;
				}
			}
		});
		setFilters(filters2);
		onFiltersChanged && onFiltersChanged(filters2.filter(filter=>filter.uri_component));
	};
	return (<React.Fragment>
				{filters.map((filter, idx)=>{
					let icon;
					let deleteThisFilter = deleteFilter.bind(null,filter);
					let onThisValueAssigned = onValueAssigned.bind(null,filter)
					if(idx+1<filters.length){
						icon = <IconButton onClick={deleteThisFilter}><HighlightOffIcon /></IconButton>
					}
					return(<Box m={1} key={filter.key} component="div" display="block">
						<FieldFilter key={filter.key} variables={variables} metadata={metadata} onVariableSelected={addFilter} onValueAssigned={onThisValueAssigned}/>
						{icon}
						</Box>);
				})}
			</React.Fragment>);
}