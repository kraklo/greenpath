let map;

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsService.route(
        {
        origin: 'Chicago, IL',
        destination: 'Los Angeles, CA',
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
            trafficModel: 'optimistic'
        }
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        }
    });

    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom:7,
        center: chicago
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    const onChangeHandler = function () {
        tryProcessMap(directionsService, directionsRenderer);
    };

    document.getElementById("click").addEventListener("click", onChangeHandler);
}

function tryProcessMap(directionsService, directionsRenderer) {
    var addressDestination = "ArtsWestMelbourne";
    var addressOrigin = "8SutherlandStreetMelbourne";
    var url = `http://localhost:8080/direction?destination=${addressDestination}&origin=${addressOrigin}`;
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        processMap(data, 0, directionsService, directionsRenderer);
    });
    //     .catch(function() {
    //     console.log("Booo");
    // });
}

function processMap(data, index, directionsService, directionsRenderer)
{
    // var directions = new Directions();
    // directions.routes = [];
    // directions.routes[0].bounds.northeast = new google.maps.LatLng(data.routes[index].bounds.northeast.lat, data.routes[index].bounds.northwest.lng);
    let directions = directionsRenderer.getDirections();
    if(directions === undefined)
    {
        console.log("test is undefined");
    }

    directions.geocoded_waypoints = data.geocoded_waypoints;

    directions.routes[0].bounds.northeast = new google.maps.LatLng(data.routes[index].bounds.northeast.lat, data.routes[index].bounds.northeast.lng);
    directions.routes[0].bounds.southwest = new google.maps.LatLng(data.routes[index].bounds.southwest.lat, data.routes[index].bounds.southwest.lng);

    directions.routes[0].copyrights = data.routes[index].copyrights;

    // directions.routes[0].overview_path.forEach(processPath);

    directions.routes[0].overview_polyline = data.routes[index].overview_polyline;

    data.routes[index].legs.forEach(processLeg);

    function processLeg(leg, i, arr)
    {
        directions.routes[0].legs[i].arrival_time = leg.arrival_time;
        directions.routes[0].legs[i].departure_time = leg.departure_time;
        directions.routes[0].legs[i].distance = leg.distance;
        directions.routes[0].legs[i].duration = leg.duration;
        directions.routes[0].legs[i].end_address = leg.end_address;
        directions.routes[0].legs[i].end_location = new google.maps.LatLng(leg.end_location.lat, leg.end_location.lng);
        directions.routes[0].legs[i].start_address = leg.start_address;
        directions.routes[0].legs[i].start_location = new google.maps.LatLng(leg.start_location.lat, leg.start_location.lng);
        
        leg.steps.forEach(processStep)

        directions.routes[0].legs[i].steps.length = leg.steps.length;
        function processStep(step, j, arr)
        {
            directions.routes[0].legs[i].steps[j].distance = step.distance;
            directions.routes[0].legs[i].steps[j].duration = step.duration;
            directions.routes[0].legs[i].steps[j].end_location = new google.maps.LatLng(step.end_location.lat, step.end_location.lng);
            directions.routes[0].legs[i].steps[j].html_instructions = step.html_instructions;
            directions.routes[0].legs[i].steps[j].start_location = new google.maps.LatLng(step.start_location.lat, step.start_location.lng);
            directions.routes[0].legs[i].steps[j].travel_mode = step.travel_mode;
            console.log(directions.routes[0].legs[i].steps[j].travel_mode);
        }
    }

    console.log(directions);
    directionsRenderer.setDirections(directions);

    // directionsService.route(
    //     {
    //     origin: 'Chicago, IL',
    //     destination: 'Los Angeles, CA',
    //     travelMode: 'DRIVING',
    //     drivingOptions: {
    //         departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
    //         trafficModel: 'optimistic'
    //     }
    // }, function(response, status) {
    //     if (status === 'OK') {
    //         data.routes.forEach(processRoute);
    //         function processRoute(item, index, arr)
    //         {
    //             console.log("Item");
    //             console.log(item);
    //             console.log(response.routes[index] === undefined);
    //
    //             console.log(item.bounds.northeast.lat);
    //             console.log(item.bounds.northeast.lng)
    //             console.log(item.bounds.southwest.lat);
    //             console.log(item.bounds.southwest.lng)
    //
    //             response.routes[index].bounds.northeast = new google.maps.LatLng(item.bounds.northeast.lat, item.bounds.northeast.lng);
    //             response.routes[index].bounds.southwest = new google.maps.LatLng(item.bounds.southwest.lat, item.bounds.southwest.lng);
    //
    //             console.log("New Northeast " +response.routes[index].bounds.northeast);
    //             console.log("New Southwest " +response.routes[index].bounds.southwest);
    //         }
    //         directionsRenderer.setDirections(response);
    //         console.log(response);
    //     }
    //     else
    //         console.log("fuck");
    // });
}

window.initMap = initMap;