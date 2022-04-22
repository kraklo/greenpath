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
    let test = directionsRenderer.getDirections();
    // directionsService.route(
    //     {
    //         origin: 'Melbourne',
    //         destination: 'Sydney',
    //         travelMode: 'DRIVING',
    //         drivingOptions: {
    //             departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
    //             trafficModel: 'optimistic'
    //         }
    //     }, function(response, status) {
    //         if (status === 'OK') {
    //             directionsRenderer.setDirections(response);
    //             directionsService.route(
    //                 {
    //                     origin: 'Melbourne',
    //                     destination: 'Sydney',
    //                     travelMode: 'DRIVING',
    //                     drivingOptions: {
    //                         departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
    //                         trafficModel: 'optimistic'
    //                     }
    //                 }, function(response, status) {
    //                     if (status === 'OK') {
    //                         directionsRenderer.setDirections(test);
    //                     }
    //                 });
    //         }
    //     });


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