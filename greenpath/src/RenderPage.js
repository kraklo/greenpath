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
            page: 'GetRoutes',
            originAddress: '',
            destinationAddress: '',
        };
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
        }
    }

    render() {
        const currentPage = this.state.page;
        console.log(currentPage);
        if (currentPage === 'GetRoutes') {
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
                        />
                    </div>
                </div>
            );
        } else if (currentPage === 'ShowRoutes') {
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
                        />
                    </div>
                </div>
            );
        } else if (currentPage === 'ShowSteps') {
            return (
                <div className='search_wrapper'>
                    <BackButton onClick={() => this.previousPage()} />
                    <div className="title_wrapper">
                        <span className="start_trip">Directions</span>
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