import React from 'react';
import axios from "axios";
import {Button, OutlinedInput, Stack, Typography, Menu, MenuItem} from "@mui/material";
import './UserPageStyles.css';
import {MapContainer, PopulateMarkers} from "./MapContainer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

function UserPage() {

    const [values, setValues] = React.useState({
        latitude: 0,
        longitude: 0,
        searchRadius: 0,
    });

    const navigate = useNavigate();

    const [places, setPlaces] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClick = (event) => {

      switch (event.currentTarget.innerText) {
          case 'Logout':
            //logout
            navigate(-1);
            break;
          default:
      }
      setAnchorEl(null);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const getPlaces = async (lat, lng, rad) => {
        setIsLoading(true);
        for(let y = places.length-1; y>=0; y--){
            places.pop();
        }
        try {
            const response = await axios.get(`http://localhost:8080/places?lat=${lat}&lng=${lng}&rad=${rad}`);
            const returnedIds = response.data;
            for(let x = 0; x<returnedIds.length; x++){
                const secondResponse = await axios.get(`http://localhost:8080/place?place_id=${returnedIds[x]}`);
                places.push(secondResponse.data);
                setPlaces(places);
            }
            PopulateMarkers(places, lat, lng);
            console.log(places);
        } catch {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="menu-div">
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    >
                       Menu
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                <MenuItem onClick={handleMenuClick}>Logout</MenuItem>
                </Menu>
            </div>
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
                    <Button variant={"contained"} disabled={isLoading} fullWidth={false} onClick={() => getPlaces(values.latitude, values.longitude, values.searchRadius)}>
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
                    {isLoading ? <Typography>Loading...</Typography> : <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Latitude</TableCell>
                                    <TableCell align="right">Longitude</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {places.length !== 0 ? places.map((place) => (
                                    <TableRow
                                        key={place.key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">
                                            {place.address}
                                        </TableCell>
                                        <TableCell align="right">{place.name}</TableCell>
                                        <TableCell align="right">{place.location.lat}</TableCell>
                                        <TableCell align="right">{place.location.lng}</TableCell>
                                    </TableRow>
                                )) : <Typography>No places found around the specified coordinates</Typography>}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </Stack>
                <MapContainer/>
            </div>
        </div>
    );
}

export default UserPage;