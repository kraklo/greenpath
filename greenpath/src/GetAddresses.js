import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import './GetAddresses.css';

const API_KEY = 'AIzaSyCnJX2TjykeZQwpOkPgOU__1im8OXJ5KP8';

const options = {
    fields: ['formatted_address'],
    componentRestrictions: { 'country': ['AU'] },
    types: []
};

let addresses = {
    origin: '',
    destination: ''
};

function AutocompleteField(props) {
    return (
        <Autocomplete
            apiKey={API_KEY}
            onPlaceSelected={(place) => props.addressSelected(place)}
            options={options}
            placeholder={props.placeholder}
        />
    );
}

class GetAutocompletes extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            originAddress: '',
            destinationAddress: ''
        });
    }

    originAddressSelected(place) {
        const addressOrigin = place?.formatted_address;

        if (!addressOrigin) {
            // find a way to change placeholder
        } else {
            this.setState({ originAddress: addressOrigin });
            addresses.origin = addressOrigin;
        }
    }

    destinationAddressSelected(place) {
        const addressDestination = place?.formatted_address;

        if (!addressDestination) {
            // find a way to change placeholder
        } else {
            this.setState({ destinationAddress: addressDestination });
            addresses.destination = addressDestination;
        }
    }

    render() {
        return (
            <>
                <div className='input_wrapper'>
                    <AutocompleteField
                        addressSelected={(place) => this.originAddressSelected(place)}
                        placeholder='Enter an origin'
                    />
                </div>
                <div className='input_wrapper'>
                    <AutocompleteField
                        addressSelected={(place) => this.destinationAddressSelected(place)}
                        placeholder='Enter a destination'
                    />
                </div>
            </>
        );
    }
}

function GetAddresses() {
    return (
        <GetAutocompletes />
    );
}

export default GetAddresses;
export const fetchAddresses = () => {
    return addresses;
};