package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)

public class Step
{
    @JsonProperty("duration")
    public TextValue duration;

    @JsonProperty("end_location")
    public Location endLocation;

    @JsonProperty("html_instructions")
    public String htmlInstructions;

    @JsonProperty("polyline")
    public DirectionsPolyline polyLine;

    @JsonProperty("start_location")
    public Location startLocation;
    @JsonProperty("travel_mode")
    public TravelMode travelMode;
    @JsonProperty("distance")
    public TextValue distance;

    //Added properties
    @JsonProperty("emissions_step")
    public TextValue emissions;
}
