import React from 'react';
import GetAddresses from './GetAddresses';
import GetRoutes from './GetRoutes';
import './App.css'
import GetMap from "./GetMap";

function App() {
    return (
        <>
            <GetMap />
            <div className='search_wrapper'>
                <div className="title_wrapper">
                    <span className="start_trip">Start Trip</span>
                </div>
                <GetAddresses />
                <GetRoutes />
            </div>
        </>
    );
}

export default App;