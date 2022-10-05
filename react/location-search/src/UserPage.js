import React from 'react';
import axios from "axios";
import {Button, OutlinedInput, Stack, Typography} from "@mui/material";
import './UserPageStyles.css';
import Table from "./Table"
import MapContainer from "./MapContainer"

function UserPage() {

    const [values, setValues] = React.useState({
        latitude: 0,
        longitude: 0,
        searchRadius: 0,
    });

    const [places, setPlaces] = React.useState([]);
    const [ids, setIds] = React.useState([]);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function getPlaces(lat, lng, rad){
        //Using localhost for now for testing sake. Will change to actual url when finished.
        setPlaces([]);
        axios.get(`http://localhost:8080/places?lat=${lat}&lng=${lng}&rad=${rad}`)
            .then(function (response) {
                setIds(response.data);
                for(let x = 0; x<ids.length; x++){
                    axios.get(`http://localhost:8080/place?place_id=${ids[x]}`)
                        .then(secondResponse => {
                            if(!places.includes(secondResponse.data.name)){
                                places.push(secondResponse.data);
                                setPlaces(places);
                            }
                        })
                }
            });
    }

    return (
        <div>
            <div className="user-page-div">
                <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} spacing={24}>
                        <Typography>Latitude</Typography>
                        <Typography>Longitude</Typography>
                        <Typography>Search Radius</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={4}>
                        <OutlinedInput
                            id="outlined-adornment-latitude"
                            type={'number'}
                            value={values.latitude}
                            onChange={handleChange('latitude')}
                        />
                        <OutlinedInput
                            id="outlined-adornment-longitude"
                            type={'number'}
                            value={values.longitude}
                            onChange={handleChange('longitude')}
                        />
                        <OutlinedInput
                            id="outlined-adornment-sr"
                            type={'number'}
                            value={values.searchRadius}
                            onChange={handleChange('searchRadius')}
                        />
                    </Stack>
                    <Button variant={"contained"} fullWidth={false} onClick={() => getPlaces(values.latitude, values.longitude, values.searchRadius)}>
                        Find Places
                    </Button>
                </Stack>
            </div>
            <div className={"bottom-half-div"}>
                <Stack
                    direction={"column"}
                    spacing={2}
                >
                    <Typography>Search results</Typography>
                    <Table places={places}/>
                </Stack>
                <MapContainer/>
            </div>
        </div>
    );
}

export default UserPage;