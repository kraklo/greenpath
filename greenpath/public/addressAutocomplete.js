let autocompleteOrigin = {
    autocomplete: null,
    placeholder: 'Enter origin address',
    id: 'autocomplete_origin'
};
let autocompleteDestination = {
    autocomplete: null,
    placeholder: 'Enter destination address',
    id: 'autocomplete_destination'
};

function initOneAutocomplete(autocomplete) {
    const input = document.getElementById(autocomplete.id);
    const options = {
        fields: ['formatted_address'],
        componentRestrictions: { 'country': ['AU'] }
    };

    autocomplete.autocomplete = new google.maps.places.Autocomplete(input, options);
    input.placeholder = autocomplete.placeholder;

    autocomplete.autocomplete.addListener('place_changed', addressSelected);
}

function initAutocomplete() {
    initOneAutocomplete(autocompleteOrigin);
    initOneAutocomplete(autocompleteDestination);
}

function addressSelected() {
    const placeOrigin = autocompleteOrigin.autocomplete.getPlace();
    const placeDestination = autocompleteDestination.autocomplete.getPlace();
    const addressOrigin = placeOrigin?.formatted_address;
    const addressDestination = placeDestination?.formatted_address;

    if (!addressOrigin) {
        document.getElementById(autocompleteOrigin.id).placeholder = autocompleteOrigin.placeholder;
    }

    if (!addressDestination) {
        document.getElementById(autocompleteDestination.id).placeholder = autocompleteDestination.placeholder;
    }
}

function getAddresses() {
    return {
        origin: autocompleteOrigin.autocomplete.getPlace()?.formatted_address,
        destination: autocompleteDestination.autocomplete.getPlace()?.formatted_address
    }
}