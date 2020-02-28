//See https://react-select.com/advanced#sortable-multiselect
import React from 'react';

import Select, { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement(props => {
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  const onMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableSelect = SortableContainer(Select);


class MultiSelectSort extends React.Component {
	  /*
	 constructor(props) {
   	 	super(props);
	    this.state = {
	      selected: []
	    };
	  }
	  componentDidMount(){
	  	this.setState({selected: this.props.options.filter(o=>o.selected)});
	  }
	  componentDidUpdate(oldProps){
	  	if(oldProps.dataset !== this.props.dataset){
	  		this.setState({selected: this.props.options.filter(o=>o.selected)});
	  	}
	  }
	  */
	render(){
		const {options,selected,onChange,placeholder} = this.props;

		  const onSortEnd = ({ oldIndex, newIndex }) => {

		    const selectedVariables = arrayMove(selected, oldIndex, newIndex);
		    onChange(selectedVariables);
		  };

		  return (
		    <SortableSelect
		      // react-sortable-hoc props:
		      axis="xy"
		      onSortEnd={onSortEnd}
		      distance={4}
		      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
		      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
		      // react-select props:
		      isMulti
		      options={options}
		      value={selected}
		      onChange={onChange}
		      components={{
		        MultiValue: SortableMultiValue,
		      }}
		      closeMenuOnSelect={false}
		      noOptionsMessage={()=><i>No more variables...</i>}
		      placeholder={placeholder || "Select..."}
		    />
		  );
	}

}

export default MultiSelectSort;