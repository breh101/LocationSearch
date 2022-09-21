import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {

    const [ currentPosition, setCurrentPosition ] = useState({});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBB0nKkpVkeFrfboPtLlOTj6xsnkY1qOaI'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={currentPosition}
                mapTypeId='satellite'
            />
        </LoadScript>
    )
}

export default MapContainer;