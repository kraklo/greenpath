import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import './GetAddresses.css';

const API_KEY = 'AIzaSyAehgtggYLjbAZ8WQQ4hcOYq1MkbyTGKGU';

const options = {
    fields: ['formatted_address'],
    componentRestrictions: { 'country': ['AU'] },
    types: []
};

// function getAddresses() {
//     return {
//         origin: autocompleteOrigin.autocomplete.getPlace()?.formatted_address,
//         destination: autocompleteDestination.autocomplete.getPlace()?.formatted_address
//     }
// }

function AutocompleteField(props) {
    return (
        <Autocomplete
            apiKey={API_KEY}
            onPlaceSelected={(place) => props.addressSelected(place)}
            options={options}
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
        }
    }

    destinationAddressSelected(place) {
        const addressDestination = place?.formatted_address;

        if (!addressDestination) {
            // find a way to change placeholder
        } else {
            this.setState({ destinationAddress: addressDestination });
        }
    }

    render() {
        return (
            <>
                <div className='input_wrapper'>
                    <AutocompleteField addressSelected={(place) => this.originAddressSelected(place)} />
                </div>
                <div className='input_wrapper'>
                    <AutocompleteField addressSelected={(place) => this.destinationAddressSelected(place)} />
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