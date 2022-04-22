import React from "react";
import { Marker } from "@react-google-maps/api";

const Pin = ({ position, index, clusterer }) => (
    <Marker key={index} position={position} clusterer={clusterer} />
);

export default Pin;
