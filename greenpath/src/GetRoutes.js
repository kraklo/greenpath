import React from 'react';
import './GetRoutes.css';
import { fetchAddresses } from './GetAddresses';

function RouteGetter(props) {
  return (
    <div className='button_wrapper'>
      <button className="go_button" onClick={props.onClick}>
        <span className="button_text">GO</span>
      </button>
    </div>
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

  return null;
}

class RouteRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {},
      error: null,
      loading: false,
    };
  }

  async fetchFromApi(addressOrigin, addressDestination) {
    const fetchAddress = `http://localhost:8080/direction?destination=${addressDestination}&origin=${addressOrigin}`;
    this.setState({ loading: true });

    const response = await fetch(fetchAddress);
    console.log(response);
    const routes = await response.json();
    this.setState({
      routes: routes,
      loading: false
    });
  }

  async sendAddresses() {
    this.setState({ error: null });
    const addresses = fetchAddresses();
    console.log(addresses);
    if (addresses.origin && addresses.destination) {
      await this.fetchFromApi(addresses.origin, addresses.destination);
      return true;
    } else {
      this.setState({ error: 'Two valid addresses not input' });
      return false;
    }
  }

  async getAllRoutes() {
    const sent = await this.sendAddresses();
    if (sent) {
      console.log(this.state.routes);
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

    if (this.state.loading) {
      return (
        <span>Loading...</span>
      );
    } else if (Object.keys(this.state.routes).length !== 0) {
      const routeItems = this.state.routes.routes.map(route => {
        return this.renderRoute({
          method: route.type,
          footprint: route.emissions
        });
      });

      console.log(this.state.routes);
      console.log(routeItems);
      return routeItems;
    }
  }

  renderRouteGetter() {
    return <RouteGetter onClick={() => this.getAllRoutes()} />;
  }

  render() {
    return (
      <>
        {this.renderRouteGetter()}
        {this.renderAllRoutes()}
      </>
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
