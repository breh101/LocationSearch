import React, {useEffect, useState, useRef} from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker} from '@react-google-maps/api';

let markers;
let first = true;
let sLat, sLng;

const MapContainer = () => {

    const mapRef = useRef(null);
    const [ currentPosition, setCurrentPosition ] = useState({});
    const [map, setMap] = useState();



    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        console.log('useEffect');
        navigator.geolocation.getCurrentPosition(success);
        if (first == true) {
            console.log('navigator');
            //navigator.geolocation.getCurrentPosition(success);
        } else {
            //setCurrentPosition({lat: sLat, lng: sLng});
            //navigator.geolocation.getCurrentPosition(success);
        }
        //navigator.geolocation.getCurrentPosition(success);
        //if (mapRef.current && !map) {
            //setMap(new window.google.maps.Map(mapRef.current, {}));
        //}
    }, [mapRef, map])

    const mapStyles = {
        height: "90vh",
        width: "100%"
    }

    function handleLoad(map) {
        mapRef.current = map;
    }

    function idleHandler() {
        if (!mapRef.current) return;
        if (first == false) {
          setCurrentPosition({lat: sLat, lng: sLng});
        }
    }
    console.log("first: "+ first +" lat: " + currentPosition.lat + " lng: " + currentPosition.lng);

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBxLjV86B7Y7lh-NB1dwk_JWy0mYz4MsQM'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                onLoad={handleLoad}
                onIdle={idleHandler}
                center={currentPosition}
                mapTypeId='map'
            />
        </LoadScript>
    )

}

const PopulateMarkers = (places, nLat, nLng, props) => {
    console.log('Lat: ' + nLat + 'Lag: ' + nLng);

    markers = places;
    sLat = nLat;
    sLng = nLng;
    first = false;

    for (let x = 0; x<markers.length; x++) {
        console.log(markers[x].location.lat);
    }
    console.log('Populated ??? :)');
/*
    const [map, setMap] = useState();
    useEffect(() => {
        if (map) {
            var bounds = new window.google.maps.LatLngBounds();
            for(var i = 0; i < markers.length; i++) {
                bounds.extend( new window.google.maps.LatLng(markers[i].location.lat, markers[i].location.lng));
            }
            map.fitBounds(bounds)
        }
    }, [markers, map])

    const onLoad = React.useCallback(function callback(map) {
        const bound = new window.google.maps.LatLngBounds();
        setBounds(bound)
        map.fitBounds(bound);
        setMap(map)
    }, [])

    const mapStyles = {
        height: "90vh",
        width: "100%"
    };

    return (
        <>
            <div className={props.className}>
                <LoadScript
                    googleMapsApiKey="AIzaSyBxLjV86B7Y7lh-NB1dwk_JWy0mYz4MsQM"
                >
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        center={{lat: sLat, lng: sLng}}
                        zoom={14}
                        onLoad={onLoad}
                    >
                        {
                            markers.map((item) => {
                                return (
                                    <Marker animation="DROP" position={{lat: item.lat, lng: item.lng}}/>
                                )
                            })
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
            <button onClick={(e) => { e.preventDefault(); console.log("hehe"); const hoho = [...markers, {lat: 59.913, lng: 10.752}]; setMarkers(hoho)}}>Add marker</button>
        </>
    )
/*
    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBxLjV86B7Y7lh-NB1dwk_JWy0mYz4MsQM'>
            <GoogleMap
                mapContainerStyle={{height: "90vh", width: "100%"}}
                center={{lat: sLat, lng: sLng}}
                zoom={13}
            >
                //{  Child components, such as markers, info windows, etc.  }
                <></>
            </GoogleMap>
        </LoadScript>
    )
*/
}

export {MapContainer, PopulateMarkers};