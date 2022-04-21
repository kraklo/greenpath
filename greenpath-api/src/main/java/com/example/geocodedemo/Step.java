package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)

public class Step
{
    @JsonProperty("distance")
    public TextValue distance;

    @JsonProperty("duration")
    public TextValue duration;

    @JsonProperty("end_location")
    public Location endLocation;

    @JsonProperty("html_instructions")
    public String htmlInstructions;

    //Skip polyline?
    @JsonProperty("travel_mode")
    public TravelMode travelMode;

    @JsonProperty("start_location")
    public Location startLocation;

    //Added properties
    @JsonProperty("emissions_step")
    public double emissions;
}
