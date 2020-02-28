import React from 'react';
import { Select, MenuItem, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

class ItemTextField extends React.Component {
	render(){
		const {variable,operation,onValueAssigned} = this.props;
		const label = variable+" "+filterkv[operation];
		const onChange = (e) =>{onValueAssigned(variable,operation,e.target.value)};
		return(<TextField label={label} variant="outlined" onChange={onChange}/>)
				
	}
}
class ItemTimeField extends React.Component {
		constructor(props){
		super(props);
			this.state = {
				absolute: true
			}
			this.handleToggleRelativeAbsolute = this.handleToggleRelativeAbsolute.bind(this);
		}
	handleToggleRelativeAbsolute = ()=>{
		this.setState({absolute: !this.state.absolute})
	}
	render(){
		const {variable,operation,onValueAssigned} = this.props;
		const label = variable+" XXXXXXXXXXXXX "+filterkv[operation];
		const onChange = (e) =>{onValueAssigned(variable,operation,e.target.value)};
		//return(<TextField label={label} variant="outlined" onChange={onChange}/>)
		const checked = this.state.absolute;
		const handleChange = ()=>console.log("fred");
		return(
			<div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
      <TextField label={label} variant="outlined" onChange={onChange}/>
       			</Grid>
				<Grid item xs={6}>
      <RadioGroup>
      <FormControlLabel value="relative" control={<Radio />} label="Relative Time" />
      <FormControlLabel value="absolute" control={<Radio />} label="Specific Time" />
      </RadioGroup>
      		</Grid>
      	</Grid>
      	</div>)
				
	}
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
class ItemFilter extends React.Component {
	render(){
		const {variable,value,datatype,onChange} = this.props;
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
}

class FieldFilterSelect extends React.Component{
	render() {
		const {variables,onChange} = this.props;
		return (<Select value="__choose__" onChange={onChange}>
			<MenuItem key="__choose__" value="__choose__">Add a filter...</MenuItem>
				{variables.map((variable)=> {
					return(<MenuItem key={variable} value={variable}>{variable}</MenuItem>)
				})}
		</Select>);
	}
}
/*
class FieldFilter extends React.Component{
	render(){
		const {variables} = this.props;
		const onChange = ()=>{console.log("woohoo!!!")};
		return (<FieldFilterSelect variables={variables} onChange={onChange}/>)
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
