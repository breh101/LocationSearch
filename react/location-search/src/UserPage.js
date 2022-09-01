import React from 'react';
import {Button, OutlinedInput, Stack, Typography} from "@mui/material";
import './UserPageStyles.css';

function UserPage() {

    const [values, setValues] = React.useState({
        latitude: 0,
        longitude: 0,
        searchRadius: 0,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
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
                <Button variant={"contained"} fullWidth={false}>
                    Find Places
                </Button>
            </Stack>
        </div>
    );
}

export default UserPage;