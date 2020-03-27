import React, {useState, useEffect} from 'react';
import { Select, MenuItem, Box } from '@material-ui/core';
import ErddapClient from '../ErddapClient'
import Erddap from './Erddap';
const erddapClient = new ErddapClient();
export default function Erddaps(props){
    const [awesomeErddaps, setAwesomErddaps] = useState([]);
    const [message, setMessage] = useState("loading...");
    const [erddapUrl, setErddapUrl] = useState("choose");
    const [fetchedAwesomErddaps, setFetchedAwesomeErddaps] = useState(false);
    const onErddapChanged = function(event){
        setErddapUrl(event.target.value);
    }
    useEffect(()=>{
        if(!fetchedAwesomErddaps){
            setFetchedAwesomeErddaps(true);
            async function fetchData() {
                await erddapClient.fetchAwesomeErddaps().then(data=>{
                    setAwesomErddaps(data.filter(x=>x.public));
                });
              }
            fetchData();        
        }
    });
    const options = awesomeErddaps.map((erddap) =>
            <MenuItem key={erddap.short_name} value={erddap.url}>{erddap.name}</MenuItem>
        );
    const erddap = erddapUrl === "choose"? "": (<Erddap key={erddapUrl} server={erddapUrl} />);
        return (
        <React.Fragment>
            <Box display="block">
            <Select value={erddapUrl} onChange={onErddapChanged} >
                <MenuItem value="choose" key="choose..." selected>Choose Erddap...</MenuItem>
                {options}
            </Select>
            </Box>

             {erddap}
        </React.Fragment>
        );

}
