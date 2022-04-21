import './App.css';
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
    };
  }

  getAllRoutes() {
    const routes = this.state.routes.slice();
    sampleApiReturn.forEach(route => routes[route.rank] = route);
    this.setState({ routes: routes });
    console.log(routes);
  }

  renderRoute(route) {
    return <Route route={route} />;
  }

  renderAllRoutes() {
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
        {this.renderAllRoutes()}
        {this.renderRouteGetter()}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <RouteRenderer />
    </div>
  );
}

export default App;
