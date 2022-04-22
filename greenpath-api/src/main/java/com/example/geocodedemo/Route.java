package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route
{
    @JsonProperty("bounds")
    public Bounds boundList;

    @JsonProperty("copyrights")
    public String copyrights;

    @JsonProperty("legs")
    public List<Leg> legs;

    @JsonProperty("overview_polyline")
    public DirectionsPolyline overview_polyline;

    @JsonProperty("overview_path")
    public Location[] overviewPath;

    @JsonProperty("summary")
    public String summary;

    @JsonProperty("warnings")
    public String[] warnings;

    @JsonProperty("waypoint_order")
    public String[] waypoint_order;
    @JsonProperty("emissions")
    public TextValue emissions;
    @JsonProperty("type")
    public TravelMode type;
}
