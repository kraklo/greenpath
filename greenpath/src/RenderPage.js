import React from 'react';
import GetAddresses from './GetAddresses';
import GetRoutes from './GetRoutes';
import './RenderPage.css';

function BackButton(props) {
    return (
        <button className='back_button' onClick={props.onClick}>&lt;</button>
    );
}

class GetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: {},
            error: null,
            loading: false,
            page: 'Landing',
            originAddress: '',
            destinationAddress: '',
            stepsToRender: null,
        };
    }

    changeStepsToRender(stepsToRender) {
        this.setState({ stepsToRender: stepsToRender });
    }

    onLoading(loading) {
        this.setState({ loading: loading });
    }

    onRoutesGet(routes, loading) {
        this.setState({
            routes: routes,
            loading: loading
        });
    }

    changeError(error) {
        this.setState({ error: error });
    }

    updateOrigin(origin) {
        this.setState({ originAddress: origin });
    }

    updateDestination(destination) {
        this.setState({ destinationAddress: destination });
    }

    changePage(page) {
        this.setState({ page: page });
    }

    previousPage() {
        if (this.state.page === 'ShowSteps') {
            this.setState({ page: 'ShowRoutes' });
        } else {
            this.setState({ page: 'GetRoutes' });
            window['clearPaths']();
        }
    }

    render() {
        const currentPage = this.state.page;
        console.log(currentPage);
        if(currentPage === 'Landing') {
            window['showId']('landing', true);
            window['showId']('main', false);
            window['showId']('map', false);
            return (
                <div className='row g-0 no-pad'>
                    <div className='col-md-6 left-half'>
                        <div className='landing-title-left-wrapper'>
                            <p className='landing-title-left'>
                                Green
                            </p>
                        </div>
                        <div className='landing-body-wrapper'>
                            <div className='landing-subtitle-wrapper'>
                                <p className='landing-subtitle'>
                                    Take a Cleaner Route
                                </p>
                            </div>
                            <div className='landing-text-wrapper'>
                                <p className='landing-text'>
                                    Calculates the gas emissions produced by modes of transportation and
                                    provides the ideal route for the user.
                                </p>
                            </div>
                            <div className='landing-button-wrapper'>
                                <button className='landing-button' onClick={() => this.changePage('GetRoutes')}>
                                    <span className="landing-button-text">START</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 right-half'>
                        <div className='landing-title-right-wrapper'>
                            <p className='landing-title-right'>
                                Path
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        else if (currentPage === 'GetRoutes') {
            window['showId']('landing', false);
            window['showId']('main', true);
            window['showId']('map', true);
            return (
                <div className='search_wrapper'>
                    <div className="title_wrapper">
                        <span className="start_trip">Start Trip</span>
                    </div>
                    <GetAddresses
                        updateOrigin={(origin) => this.updateOrigin(origin)}
                        updateDestination={(destination) => this.updateDestination(destination)}
                    />
                    <div className="GetRoutes">
                        <GetRoutes
                            onLoading={(loading) => this.onLoading(loading)}
                            onRoutesGet={(routes, loading) => this.onRoutesGet(routes, loading)}
                            changeError={(error) => this.changeError(error)}
                            routes={this.state.routes}
                            error={this.state.error}
                            loading={this.state.loading}
                            page={this.state.page}
                            originAddress={this.state.originAddress}
                            destinationAddress={this.state.destinationAddress}
                            changePage={(page) => this.changePage(page)}
                            stepsToRender={this.state.stepsToRender}
                            changeStepsToRender={(stepsToRender) => this.changeStepsToRender(stepsToRender)}
                        />
                    </div>
                </div>
            );
        } else if (currentPage === 'ShowRoutes') {
            window['showId']('landing', false);
            window['showId']('main', true);
            window['showId']('map', true);
            return (
                <div className='search_wrapper'>
                    <BackButton onClick={() => this.previousPage()} />
                    <div className="title_wrapper">
                        <span className="start_trip">Routes</span>
                    </div>
                    <div className="GetRoutes">
                        <GetRoutes
                            onLoading={(loading) => this.onLoading(loading)}
                            onRoutesGet={(routes, loading) => this.onRoutesGet(routes, loading)}
                            changeError={(error) => this.changeError(error)}
                            routes={this.state.routes}
                            error={this.state.error}
                            loading={this.state.loading}
                            page={this.state.page}
                            originAddress={this.state.originAddress}
                            destinationAddress={this.state.destinationAddress}
                            changePage={(page) => this.changePage(page)}
                            stepsToRender={this.state.stepsToRender}
                            changeStepsToRender={(stepsToRender) => this.changeStepsToRender(stepsToRender)}
                        />
                    </div>
                </div>
            );
        } else if (currentPage === 'ShowSteps') {
            window['showId']('landing', false);
            window['showId']('main', true);
            window['showId']('map', true);
            return (
                <div className='search_wrapper'>
                    <BackButton onClick={() => this.previousPage()} />
                    <div className="title_wrapper">
                        <span className="start_trip">Directions</span>
                    </div>
                    <div className='GetRoutes'>
                        <GetRoutes
                            onLoading={(loading) => this.onLoading(loading)}
                            onRoutesGet={(routes, loading) => this.onRoutesGet(routes, loading)}
                            changeError={(error) => this.changeError(error)}
                            routes={this.state.routes}
                            error={this.state.error}
                            loading={this.state.loading}
                            page={this.state.page}
                            originAddress={this.state.originAddress}
                            destinationAddress={this.state.destinationAddress}
                            changePage={(page) => this.changePage(page)}
                            stepsToRender={this.state.stepsToRender}
                            changeStepsToRender={(stepsToRender) => this.changeStepsToRender(stepsToRender)}
                        />
                    </div>
                </div>
            );
        }
    }
}

function RenderPage() {
    return (
        <GetPage />
    );
}

export default RenderPage;