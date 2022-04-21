package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DirectionResult
{
    @JsonProperty("geocoded_waypoints")
    public List<GeocodedWaypoint> geocodedWaypointList;

    @JsonProperty("routes")
    public List<Route> routeList;


}
