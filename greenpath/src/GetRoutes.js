import React from 'react';

const sampleApiReturn = [
  {
    method: "bike",
    footprint: 0,
    rank: 0,
  },
  {
    method: "car",
    footprint: 100,
    rank: 2,
  },
  {
    method: "walk",
    footprint: 0,
    rank: 1,
  }
];

function RouteGetter(props) {
  return (
    <button onClick={props.onClick}>Get Routes</button>
  );
}

function Route(props) {
  if (props.route) {
    return (
      <div>
        <h3>Method: {props.route.method}</h3>
        <p>Footprint: {props.route.footprint}</p>
      </div>
    );
  }
}

class RouteRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: Array(sampleApiReturn.length).fill(null),
      error: null,
      postId: null,
    };
  }

  fetchFromApi(addressOrigin, addressDestination) {
    const fetchAddress = `http://localhost:8080/direction?destination=${addressDestination}&origin=${addressOrigin}`;

    fetch(fetchAddress)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  sendAddresses() {
    this.setState({ error: null });
    const getAddresses = () => window['getAddresses']();
    const addresses = getAddresses();
    console.log(addresses);
    if (addresses.origin && addresses.destination) {
      this.fetchFromApi(addresses.origin, addresses.destination);
    } else {
      this.setState({ error: 'Two valid addresses not input' });
    }
  }

  getAllRoutes() {
    this.sendAddresses();
    if (!this.state.error) {
      const routes = this.state.routes.slice();
      sampleApiReturn.forEach(route => routes[route.rank] = route);
      this.setState({ routes: routes });
    }
  }

  renderRoute(route) {
    return <Route route={route} />;
  }

  renderAllRoutes() {
    if (this.state.error) {
      return (
        <span style={{ color: 'red' }}> {this.state.error}</span>
      );
    }
    const routes = [];
    this.state.routes.forEach(route => routes.push(this.renderRoute(route)));
    return routes;
  }

  renderRouteGetter() {
    return <RouteGetter onClick={() => this.getAllRoutes()} />;
  }

  render() {
    return (
      <div>
        {this.renderRouteGetter()}
        {this.renderAllRoutes()}
      </div>
    );
  }
}

function GetRoutes() {
  return (
    <div className="GetRoutes">
      <RouteRenderer />
    </div>
  );
}

export default GetRoutes;
