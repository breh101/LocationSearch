import React, {useEffect, useState, useRef} from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';

const markers = [];
//First: First time where there is no user input
let first = true;
let mapReset = false;

const MapContainer = () => {

    const [ currentPosition, setCurrentPosition ] = useState({});
    const [activeMarker, setActiveMarker] = useState(null);
    const mapRef = useRef(null);

    function handleLoad(map) {
        mapRef.current = map;
    }

    const handleActiveMarker = (markerF) => {
        if (markerF === activeMarker) {
            return;
        }
        setActiveMarker(markerF);
    };

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    if (first === true) {
        markers[0] = {lat: currentPosition.lat, lng: currentPosition.lat, id: 0, name: 'Default'};
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

    function updateCenter() {
        if (mapReset == true) {
            setCurrentPosition({lat: markers[0].lat, lng: markers[0].lng});
            mapReset = false;
        }
    }

    function handleCenter(id) {
        if (!mapRef.current) return;

        if (first == false) {
            const newPos = {lat: markers[id].lat, lng: markers[id].lng};
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
            onIdle={updateCenter}
            center={currentPosition}
            onClick={() => setActiveMarker(null)}
            mapTypeId='satellite'
        >
            {markers.map((marker) => (
                <MarkerF
                    key = {marker.id}
                    position = {{ lat:marker.lat, lng:marker.lng }}
                    onClick={() => {
                        handleActiveMarker(marker.id);
                        handleCenter(marker.id);
                    }}>
                    {activeMarker === marker.id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h3>{marker.name}</h3>
                                <h5>{marker.address}</h5>
                                <a href={marker.url} target="_blank" rel="noopener noreferrer">{"Google Maps Link"}</a>
                            </div>
                        </InfoWindowF>
                    ) : null}
                </MarkerF>
            ))}
        </GoogleMap>
    </LoadScript>
    )

}

const PopulateMarkers = (places) => {
    first = false;
    mapReset = true;

    for (let x = 0; x<places.length; x++) {
        markers[x] = {lat: places[x].location.lat, lng: places[x].location.lng, id: x, name: places[x].name, address: places[x].address, url: places[x].url};
    }
}

export {MapContainer, PopulateMarkers};