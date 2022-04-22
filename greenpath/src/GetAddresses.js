import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import './GetAddresses.css';

const API_KEY = 'AIzaSyAehgtggYLjbAZ8WQQ4hcOYq1MkbyTGKGU';

const options = {
    fields: ['formatted_address'],
    componentRestrictions: { 'country': ['AU'] },
    types: []
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

class GetAddresses extends React.Component {

    originAddressSelected(place) {
        const addressOrigin = place?.formatted_address;

        if (!addressOrigin) {
            // find a way to change placeholder
        } else {
            this.props.updateOrigin(addressOrigin);
        }
    }

    destinationAddressSelected(place) {
        const addressDestination = place?.formatted_address;

        if (!addressDestination) {
            // find a way to change placeholder
        } else {
            this.props.updateDestination(addressDestination);
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

export default GetAddresses;