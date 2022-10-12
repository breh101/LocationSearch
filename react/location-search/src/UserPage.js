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
              localStorage.setItem("token", null);
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
            const response = await axios.get(`http://localhost:8080/api/places?lat=${lat}&lng=${lng}&rad=${rad}`);
            const returnedIds = response.data;
            for(let x = 0; x<returnedIds.length; x++){
                const secondResponse = await axios.get(`http://localhost:8080/api/place?place_id=${returnedIds[x]}`);
                places.push(secondResponse.data);
                setPlaces(places);
            }
            PopulateMarkers(places, lat, lng);
        } catch {

        } finally {
            setIsLoading(false);
            console.log(places);
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
                    variant={"contained"}
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
                        <Typography>Latitude (in degrees)</Typography>
                        <Typography>Longitude (in degrees)</Typography>
                        <Typography>Search Radius (in miles)</Typography>
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
                    direction={"row"}
                    spacing={1}
                >
                    <Stack
                        direction={"column"}
                        spacing={2}
                    >
                        <Typography>Search results</Typography>
                        {isLoading ? <Typography>Loading...</Typography> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 900 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="left">Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                {places.length !== 0 ?  places.map((place) => (
                                        <TableBody>
                                            <TableRow
                                                key={place.key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="right">
                                                    {place.address}
                                                </TableCell>
                                                <TableCell align="center"><a href={place.url}>{place.name}</a></TableCell>
                                                <TableCell align="left">{place.phone ? place.phone : "No # found"}</TableCell>
                                            </TableRow>
                                        </TableBody> )) :
                                    <Typography>No places found around the specified coordinates</Typography>}
                            </Table>
                        </TableContainer>}
                    </Stack>
                    <MapContainer/>
                </Stack>
            </div>
        </div>
    );
}

export default UserPage;