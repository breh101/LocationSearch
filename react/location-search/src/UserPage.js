import * as React from 'react';
import {Button, OutlinedInput, Stack, Typography, Menu, MenuItem} from "@mui/material";
import './UserPageStyles.css';
import Table from "./Table"
import MapContainer from "./MapContainer"

function UserPage() {

    const [values, setValues] = React.useState({
        latitude: 0,
        longitude: 0,
        searchRadius: 0,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
                <MenuItem onClick={handleClose}>Saved Location</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
            <div className="user-page-div">

                <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} spacing={24}>
                        <Typography>OLD</Typography>
                        <Typography>Latitude</Typography>
                        <Typography>Longitude</Typography>
                        <Typography>Search Radius</Typography>
                        <Typography>OLD</Typography>
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
                    <Button variant={"contained"} fullWidth={false}>
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
                    <Table/>
                </Stack>
                <MapContainer/>
            </div>
        </div>
    );
}

export default UserPage;