import React from 'react';
import { Select, MenuItem, TextField} from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import { FormGroup, FormControl, FormLabel} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';



function ItemTextField(props) {
    //TODO: split this into two controls...
		const {variable,operation,onValueAssigned,metadata} = props;
		const label = variable+" "+filterkv[operation];
        const [value, setvalue] = React.useState("_choose");
		const onChange = (event, val, reason) =>{
            const assigned = event.target.value; //event.target && event.target.value !== undefined ? event.target.value: val;
            setvalue(assigned);
            onValueAssigned(variable,operation,assigned);
        };
        let options = metadata.subsets[variable];
        if(options){
            const isString = metadata._type[variable] === 'String'?true:false;

            if(false && isString){
                return(
                    <Autocomplete
                  options={options}
                  style={{ width: 300, display: 'inline-flex'}}
                  renderInput = {params => (<TextField {...params} label={label} variant="outlined" />)}
                  label={label}
                  onInputChange={onChange}
                     />);
            }
            return(
            <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">{label}</FormLabel>
                <Select label={label} value={value} onChange={onChange}>
                <MenuItem key="_choose" value="_choose">Choose... </MenuItem>
                {options.map(option=>{
                    return(<MenuItem key={option} value={option}>{option}</MenuItem>)
                })}
                </Select>
            </FormControl>);
         
        }
		return (<TextField label={label} variant="outlined" onChange={onChange}/>);
}

function ItemTimeField(props){
		const [absoluteOrRelative, setAbsoluteOrRelative] = React.useState("0");
		const [now, setNow] = React.useState("now-");
		const [timeUnits, setTimeUnits] = React.useState("hours");
		const [timeQuantity, setTimeQuantity] = React.useState(1);
		const [badDateFormat, setBadDateFormat] = React.useState(false);
		const [selectedDate, setSelectedDate] = React.useState(false);
		const {variable,operation,onValueAssigned} = props;
		const label = variable+" "+filterkv[operation];
		const onAbsoluteOrRelativeChanged = (e)=>setAbsoluteOrRelative(e.target.value);
		const onRelativeTimeQuantityChanged = (e) =>{
			var value = parseInt(e.target.value);
			setTimeQuantity(value);
			onValueAssigned(variable,operation,now+value+timeUnits);
		};
		const onRelativeTimeUnitsChanged = (e)=>{
			var value = e.target.value;
			setTimeUnits(value);
			onValueAssigned(variable,operation,now+timeQuantity+value);
		}
		const onRelativeTimeNowChanged = (e)=>{
			var value = e.target.value;
			setNow(value);
			onValueAssigned(variable,operation,value+timeQuantity+timeUnits);
		}
		const onAbsoluteTimeChanged = (date) =>{
			var isodate;
			try{
				isodate = date.toISOString().substring(0,18)+"Z";
			}catch(e){
				setBadDateFormat(true);
				return;
			}
			setSelectedDate(date);
			setBadDateFormat(false);
			onValueAssigned(variable,operation,isodate)
		};
		if(absoluteOrRelative === "0"){
			return(
			<Select labelId={label} value={absoluteOrRelative} onChange={onAbsoluteOrRelativeChanged}>
				<MenuItem key="0" value="0">Choose how to specify {variable}... </MenuItem>
				<MenuItem key="absolute" value="absolute">A specific date/time...</MenuItem>)
				<MenuItem key="relative" value="relative">A time relative to when the query is run...</MenuItem>)
			</Select>
		 );
		}
		if(absoluteOrRelative === "relative"){
			return (
			<FormControl component="fieldset" margin="dense">
        <FormLabel component="legend">{label}</FormLabel>
			<FormGroup row={true}>
			<Select value={now} onChange={onRelativeTimeNowChanged}>
				<MenuItem key="nowPlus" value="now+">NOW plus</MenuItem>)
				<MenuItem key="nowMinus" value="now-">NOW minus</MenuItem>
			</Select>
			   <TextField type="number" InputProps={{inputProps:{min: 1}}} value={timeQuantity} onChange={onRelativeTimeQuantityChanged}/>
			<Select value={timeUnits} onChange={onRelativeTimeUnitsChanged}>
				<MenuItem key="seconds" value="seconds">{timeQuantity === 1 ? "second":"seconds"}</MenuItem>
				<MenuItem key="minutes" value="minutes">{timeQuantity === 1 ? "minute":"minutes"}</MenuItem>
				<MenuItem key="hours" value="hours">{timeQuantity === 1 ? "hour": "hours"}</MenuItem>
				<MenuItem key="days" value="days">{timeQuantity === 1 ? "day": "days"}</MenuItem>
				<MenuItem key="months" value="months">{timeQuantity === 1 ? "month": "months"}</MenuItem>
				<MenuItem key="years" value="years">{timeQuantity === 1 ? "year": "years"}</MenuItem>
				
			</Select>
			   </FormGroup>
			   </FormControl>);
		}
		if(selectedDate === false){
			onAbsoluteTimeChanged(new Date(new Date().toISOString().substring(0,10)+"Z"))
		}

		 return (      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label={label}
        value={selectedDate}
        onChange={onAbsoluteTimeChanged}
        onError={console.log}
        format="yyyy-MM-dd HH:mm:ss"
      />);
				
}
const filterkv = {
	"=": "equals",
	"!=": "does not equal",
	"<": "is less than",
	">": "is greater than",
	">=": "is not less than",
	"<=": "is not greater than",
	"=~": "matches the regular expression"
}

function ItemFilter(props){
	const {variable,value,datatype,onChange} = props;
	const filters = ["=","!=","<",">","<=",">="];
	if(datatype === "String"){
		filters.push("=~");
	}

	return(
			<Select labelId={variable} value={value} onChange={onChange}>
			<MenuItem key="0" value="0">Filter by {variable} ... </MenuItem>
			{filters.map((key)=>{
				return(<MenuItem key={key} value={key}>{variable} {filterkv[key]}</MenuItem>)
			})}
			</Select>
		);
}

function FieldFilterSelect(props){
	const {variables,onChange} = props;
	return (<Select value="__choose__" onChange={onChange}>
		<MenuItem key="__choose__" value="__choose__">Add a filter...</MenuItem>
			{variables.map((variable)=> {
				return(<MenuItem key={variable} value={variable}>{variable}</MenuItem>)
			})}
	</Select>);
}
/*
class FieldFilter extends React.Component{
	render(){
		const {variables} = this.props;
		return (
            <FieldFilterSelect variables={variables} onChange={onChange}/>
            )
	}
}

export default FieldFilter;
*/
export default function FieldFilter(props){
	const [variable, setVariable] = React.useState(null)
	const [filterop, setFilterop] = React.useState(null)
		const {variables,onVariableSelected, onValueAssigned, metadata} = props;
		const onVariableChange = (e)=>{
			if(e.target.value !== "__choose__"){
				setVariable(e.target.value);
				onVariableSelected(e.target.value);
			}
		};
		const onFilterOpChange = (e)=>{setFilterop(e.target.value)};
		const datatype = metadata._type[variable];
		if(filterop){
			if(datatype === "Time"){
				return(<ItemTimeField variable={variable} metadata={metadata} operation={filterop} onValueAssigned={onValueAssigned}/>)
			}
			return(<ItemTextField variable={variable} metadata={metadata} operation={filterop} onValueAssigned={onValueAssigned}/>)
		}
		if(variable){
			return(<ItemFilter datatype={datatype} variable={variable} value="0" onChange={onFilterOpChange}/>)
		}
		return (<FieldFilterSelect variables={variables} onChange={onVariableChange}/>)
}
