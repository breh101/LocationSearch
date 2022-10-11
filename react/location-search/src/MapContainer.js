import React, {useEffect, useState, useRef} from 'react';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';

const markers = [];
//First: First time where there is no user input
let first = true;
let sLat, sLng;

const MapContainer = () => {

    const [ currentPosition, setCurrentPosition ] = useState({});
    const mapRef = useRef(null);

    function handleLoad(map) {
        mapRef.current = map;
    }

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    if (first === true) {
        markers[0] = currentPosition;
    }

    useEffect(() => {
        if (first === true) {
            navigator.geolocation.getCurrentPosition(success);
        }
    }, [])

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };

    function handleCenter() {
        if (!mapRef.current) return;

        if (first === false) {
            const newPos = {lat: markers[0].lat, lng: markers[0].lng};
            setCurrentPosition(newPos);
        }
    }

    return (
    <LoadScript
        googleMapsApiKey='AIzaSyBxLjV86B7Y7lh-NB1dwk_JWy0mYz4MsQM'>
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            onLoad={handleLoad}
            onIdle={handleCenter}
            center={currentPosition}
            mapTypeId='satellite'
        >
            {markers.map((marker) => (
                <MarkerF
                    position = {{ lat:marker.lat, lng:marker.lng }}/>
            ))}
        </GoogleMap>
    </LoadScript>
    )

}

const PopulateMarkers = (places, nLat, nLng, props) => {

    sLat = nLat;
    sLng = nLng;
    first = false;

    for (let x = 0; x<places.length; x++) {
        markers[x] = {lat: places[x].location.lat, lng: places[x].location.lng, name: places[x].name};
    }
}

export {MapContainer, PopulateMarkers};