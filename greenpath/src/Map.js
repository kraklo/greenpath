import React from "react";
import MapContainer from "./MapContainer.js";

function Map() {
    return (
        <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
            <MapContainer />
        </div>
    );
}

export default Map;