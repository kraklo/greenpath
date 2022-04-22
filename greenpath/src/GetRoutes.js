import React from 'react';
import './GetRoutes.css';

import DRIVING from './images/DRIVING.svg';
import WALKING from './images/WALKING.svg';
import TRANSIT from './images/TRANSIT.svg';
import BICYCLING from './images/BICYCLING.svg';

const icons = {
  DRIVING,
  WALKING,
  TRANSIT,
  BICYCLING
};


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
    console.log(props.route);
    const today = new Date();
    const depart = today.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });
    const durationVal = props.route.legs[0].duration.value;
    const durationText = props.route.legs[0].duration.text;
    const arrival = new Date(today.getTime() + durationVal * 1000)
    const arrive = arrival.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });
    const emissions = props.route.emissions.value;
    return (
      <div className='route_option' onClick={props.onClick}>
        <span className='arrival_destination_time'>{depart} - {arrive}</span>
        <div className='duration_emissions'>
          <span className='duration'>{durationText} / <span className='emissions'>{Math.trunc(emissions)} grams</span></span>
        </div>
        <img className='method_icon' src={icons[props.route.type]} alt={props.route.type}></img>

      </div>
    );
  }

  return null;
}

class GetRoutes extends React.Component {
  async fetchFromApi(addressOrigin, addressDestination) {
    const fetchAddress = `http://localhost:8080/direction?destination=${addressDestination}&origin=${addressOrigin}`;
    this.props.onLoading(true);

    const response = await fetch(fetchAddress);
    console.log(response);
    const routes = await response.json();
    this.props.onRoutesGet(routes, false);
  }

  showWalk() {
    window['processMap'](0);
    this.props.changePage('ShowSteps');
  }

  showBike() {
    window['processMap'](1);
    this.props.changePage('ShowSteps');
  }

  showTransit() {
    window['processMap'](2);
    this.props.changePage('ShowSteps');
  }

  showDrive() {
    window['processMap'](3);
    this.props.changePage('ShowSteps');
  }

  async sendAddresses() {
    this.props.changeError(null);
    const addresses = {
      origin: this.props.originAddress,
      destination: this.props.destinationAddress
    };
    console.log(addresses);
    if (addresses.origin && addresses.destination) {
      await this.fetchFromApi(addresses.origin, addresses.destination);
      return true;
    } else {
      this.props.changeError('Two valid addresses not input');
      return false;
    }
  }

  async getAllRoutes() {
    const sent = await this.sendAddresses();
    if (sent) {
      console.log(this.props.routes);
      window['setStoredData'](this.props.routes);
      if (this.props.page !== 'ShowRoutes') {
        this.props.changePage('ShowRoutes');
      }
    }
  }

  renderRoute(route, i) {
    let callback;
    switch (i) {
      case 0:
        callback = () => this.showWalk();
        break;
      case 1:
        callback = () => this.showBike();
        break;
      case 2:
        callback = () => this.showTransit();
        break;
      case 3:
        callback = () => this.showDrive();
        break;
    }
    return <Route
      route={route}
      onClick={callback}
    />;
  }

  renderAllRoutes() {
    if (this.props.error) {
      return (
        <span style={{ color: 'red' }}> {this.props.error}</span>
      );
    }

    if (this.props.loading) {
      return (
        <span>Loading...</span>
      );
    } else if (Object.keys(this.props.routes).length !== 0) {
      const routeItems = [];
      let i = 0;
      this.props.routes.routes.forEach(route => {
        routeItems.push(this.renderRoute(route, i));
        i++;
      });

      console.log(this.props.routes);
      console.log(routeItems);
      return routeItems;
    }
  }

  renderRouteGetter() {
    return <RouteGetter onClick={() => this.getAllRoutes()} />;
  }

  render() {
    const currentPage = this.props.page;
    if (currentPage === 'GetRoutes') {
      return (
        <>
          {this.renderRouteGetter()}
        </>
      );
    }

    return (
      <>
        {this.renderAllRoutes()}
      </>
    );
  }
}

export default GetRoutes;
