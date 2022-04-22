let map;
let storedDirections;
let path;
let paths = [];
let storedRoutes;
let directionsService;
let directionsRenderer;
const Y_OFFSET = 0.003;
const X_OFFSET = 0.010;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

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
            storedDirections = response;
            console.log("ready!");
        }
    });

    var melbourne = new google.maps.LatLng( -37.840935, 144.946457);
    var mapOptions = {
        zoom:12,
        center: melbourne,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    const onLoadHandler = function() {
        loadRoutes();
    }
    const onChangeHandler = function () {
        processMap(0);
    };
    const onChangeHandlerTwo = function () {
        processMap(1);
    };

    document.getElementById("load").addEventListener("click", onLoadHandler);
    document.getElementById("click").addEventListener("click", onChangeHandler);
    document.getElementById("click-two").addEventListener("click", onChangeHandlerTwo);
}

function setStoredData(data)
{
    storedRoutes = data;
    console.log("Data has been stored!");
    initRoutes();
}

function loadRoutes()
{
    var addressDestination = "ArtsWestMelbourne";
    var addressOrigin = "8SutherlandStreetMelbourne";
    var url = `http://localhost:8080/direction?destination=${addressDestination}&origin=${addressOrigin}`;
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        setStoredData(data);
    });
}

async function initRoutes()
{
    if(storedRoutes === undefined || storedRoutes === null)
    {
        console.log("Stored roots is undefined or null!");
        return;
    }
    let routesLength = storedRoutes.routes.length;
    if(routesLength < 0)
    {
        console.log("There are no routes!");
        return;
    }

    let directions = storedDirections;
    let data = storedRoutes;

    directions.geocoded_waypoints = data.geocoded_waypoints;

    directions.routes[0].bounds.northeast = new google.maps.LatLng(data.routes[0].bounds.northeast.lat, data.routes[0].bounds.northeast.lng);
    directions.routes[0].bounds.southwest = new google.maps.LatLng(data.routes[0].bounds.southwest.lat, data.routes[0].bounds.southwest.lng);

    directions.routes[0].copyrights = data.routes[0].copyrights;

    // directions.routes[0].overview_path.forEach(processPath);

    let newPath = google.maps.geometry.encoding.decodePath(data.routes[0].overview_polyline.points);
    directions.routes[0].overview_path = Object.assign({}, storedDirections.routes[0].overview_path);
    directions.routes[0].overview_path.length = newPath.length;
    newPath.forEach(processPath)
    function processPath(path, i, arr)
    {
        directions.routes[0].overview_path[i] = path;
    }

    directions.routes[0].overview_polyline = data.routes[0].overview_polyline.points;

    data.routes[0].legs.forEach(processLeg);

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
        directions.routes[0].legs[i].steps = Object.assign({}, storedDirections.routes[0].legs[i].steps);
        directions.routes[0].legs[i].steps.length = Object.assign({}, storedDirections.routes[0].overview_path);
        function processStep(step, j, arr)
        {
            directions.routes[0].legs[i].steps[j].distance = step.distance;
            directions.routes[0].legs[i].steps[j].duration = step.duration;
            directions.routes[0].legs[i].steps[j].end_location = new google.maps.LatLng(step.end_location.lat, step.end_location.lng);
            directions.routes[0].legs[i].steps[j].html_instructions = step.html_instructions;
            directions.routes[0].legs[i].steps[j].start_location = new google.maps.LatLng(step.start_location.lat, step.start_location.lng);
            directions.routes[0].legs[i].steps[j].travel_mode = step.travel_mode;
        }
    }

    directionsRenderer.setDirections(directions);

    await sleep(100);

    //Resize path to routes length
    paths.length = routesLength;
    data.routes.forEach(processPolyline);
    function processPolyline(route, i, arr)
    {
        if(paths[i] !== undefined && paths[i] !== null)
            paths[i].setMap(null)

        paths[i] = new google.maps.Polyline({
            strokeColor: '#8D8D8D',
            strokeOpacity: 1,
            strokeWeight: 5,
            map: map,
            geodesic: true,
            path: google.maps.geometry.encoding.decodePath(data.routes[i].overview_polyline.points)
        });

        paths[i].setMap(map);
    }

    if(routesLength > 0)
    {
        var bounds = new google.maps.LatLngBounds();
        var northeastBound = new google.maps.LatLng(data.routes[0].bounds.northeast.lat + Y_OFFSET, data.routes[0].bounds.northeast.lng - X_OFFSET);
        var southwestBound = data.routes[0].bounds.southwest;
        bounds.extend(northeastBound);
        bounds.extend(southwestBound);
        map.fitBounds(bounds);
    }
}

async function processMap(index)
{
    if(storedRoutes === undefined || storedRoutes === null)
    {
        console.log("Stored roots is undefined or null!");
        return;
    }
    if(index > storedRoutes.routes.length)
    {
        console.log("Index is too large!");
        return;
    }
    if(index < 0)
    {
        console.log("Index is too small!");
        return;
    }

    let directions = storedDirections;
    let data = storedRoutes;

    paths.length = data.routes.length;
    data.routes.forEach(processPolyline);
    function processPolyline(route, i, arr)
    {
        if(paths[i] !== undefined && paths[i] !== null)
            paths[i].setMap(null)

        if(i === index)
            return;

        paths[i] = new google.maps.Polyline({
            strokeColor: '#8D8D8D',
            strokeOpacity: 1,
            strokeWeight: 5,
            map: map,
            geodesic: true,
            path: google.maps.geometry.encoding.decodePath(data.routes[i].overview_polyline.points)
        });

        paths[i].setMap(map);
    }

    paths[index] = new google.maps.Polyline({
        strokeColor: '#5CC600',
        strokeOpacity: 1,
        strokeWeight: 8,
        map: map,
        geodesic: true,
        path: google.maps.geometry.encoding.decodePath(data.routes[index].overview_polyline.points)
    });
    paths[index].setMap(map);
    
    // var bounds = new google.maps.LatLngBounds();
    // var northeastBound = new google.maps.LatLng(data.routes[index].bounds.northeast.lat + Y_OFFSET, data.routes[index].bounds.northeast.lng - X_OFFSET);
    // var southwestBound = data.routes[index].bounds.southwest;
    // bounds.extend(northeastBound);
    // bounds.extend(southwestBound);
    // map.fitBounds(bounds);
}

function clearPaths()
{
    for(let i=0; i<paths.length; ++i)
    {
        paths[i].setMap(null);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.initMap = initMap;