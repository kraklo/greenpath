import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './GetAddresses.css';

const API_KEY = 'AIzaSyAehgtggYLjbAZ8WQQ4hcOYq1MkbyTGKGU';

const Component = () => (
    <div>
        <GooglePlacesAutocomplete
            apiKey={API_KEY}
        />
    </div>
);

function GetAddresses() {
    return (
        <div>
            <div className='input_wrapper'>
                <input id="autocomplete_origin"></input>
            </div>
            <div className='input_wrapper'>
                <input id="autocomplete_destination"></input>
            </div>
        </div>
    );
}

export default GetAddresses;