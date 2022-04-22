import React from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = 'AIzaSyCHWC6UAUW6eR6CGZjHnnCFkBrczCClb6Q';
const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: '67px'
};

const center = {
    lat: -37.796368,
    lng: 144.961166
};

export default function GetMap() {
    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey={GOOGLE_API_KEY}
            language="en"
            region="EN"
            version="weekly"
            libraries={libraries}
        >
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}></GoogleMap>
        </LoadScript>
    )
}
