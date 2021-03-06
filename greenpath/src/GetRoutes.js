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

function Step(props) {
  return (
    <div className='step_option'>
      <span className='step' dangerouslySetInnerHTML={{ __html: props.step.html_instructions }}></span>
      <img className='step_icon' src={icons[props.step.travel_mode]} alt={props.step.travel_mode}></img>
    </div>
  );
}

function RouteGetter(props) {
  const loadingContent = props.loading ? (<h3>Loading...</h3>) : null;
  return (
    <>
      <div className='button_wrapper'>
        <button className="go_button" onClick={props.onClick}>
          <span className="button_text">GO</span>
        </button>
      </div>
      {loadingContent}
    </>
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
      <div className={props.option} onClick={props.onClick}>
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

  renderAllSteps() {
    const steps = this.props.stepsToRender;
    const instructions = steps.legs[0].steps.map((step) => {
      return <Step step={step} />
    })

    return instructions;
  }

  showWalk() {
    window['processMap'](0);
    const steps = this.props.routes.routes[0];
    this.props.changeStepsToRender(steps);
    this.props.changePage('ShowSteps');
  }

  showBike() {
    window['processMap'](1);
    const steps = this.props.routes.routes[1];
    this.props.changeStepsToRender(steps);
    this.props.changePage('ShowSteps');
  }

  showTransit() {
    window['processMap'](2);
    const steps = this.props.routes.routes[2];
    this.props.changeStepsToRender(steps);
    this.props.changePage('ShowSteps');
  }

  showDrive() {
    window['processMap'](3);
    const steps = this.props.routes.routes[3];
    this.props.changeStepsToRender(steps);
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

  renderRoute(route, i, option) {
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
      default:
        callback = () => { return; }; // do nothing on click when rendered on show steps
        break;
    }
    return <Route
      route={route}
      onClick={callback}
      option={option}
    />;
  }

  renderAllRoutes() {
    if (this.props.error) {
      return (
        <span style={{ color: 'red' }}> {this.props.error}</span>
      );
    }

    if (this.props.loading) {
      return null;
    } else if (Object.keys(this.props.routes).length !== 0) {
      const routeItems = [];
      let i = 0;
      this.props.routes.routes.forEach(route => {
        routeItems.push(this.renderRoute(route, i, 'route_option'));
        i++;
      });

      console.log(this.props.routes);
      console.log(routeItems);
      return routeItems;
    }
  }

  renderRouteGetter() {
    return <RouteGetter
      onClick={() => this.getAllRoutes()}
      loading={this.props.loading}
    />;
  }

  render() {
    const currentPage = this.props.page;
    if (currentPage === 'GetRoutes') {
      return (
        <>
          {this.renderRouteGetter()}
        </>
      );
    } else if (currentPage === 'ShowRoutes') {
      return (
        <>
          {this.renderAllRoutes()}
        </>
      );
    } else if (currentPage === 'ShowSteps') {
      return (
        <>
          <hr />
          {this.renderRoute(this.props.stepsToRender, null, 'directions_option')}
          <hr />
          {this.renderAllSteps()}
        </>
      );
    } else {
      // if this happens we are doomed
      return null;
    }
  }
}

export default GetRoutes;
