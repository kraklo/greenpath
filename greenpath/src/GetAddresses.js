import React from 'react';
import './GetAddresses.css';

function GetAddresses() {
    return (
        <div>
            <div>
                <input id="autocomplete_origin"></input>
            </div>
            <div>
                <input id="autocomplete_destination"></input>
            </div>
        </div>
    );
}

export default GetAddresses;