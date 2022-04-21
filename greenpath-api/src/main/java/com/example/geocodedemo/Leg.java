package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)

public class Leg
{
    @JsonProperty("arrival_time")
    public TravelTime arrivalTime;

    @JsonProperty("departure_time")
    public TravelTime departureTime;

    @JsonProperty("distance")
    public TextValue distance;

    @JsonProperty("duration")
    public TextValue duration;

    @JsonProperty("end_address")
    public String endAddress;

    @JsonProperty("end_location")
    public Location endLocation;

    @JsonProperty("start_address")
    public String startAddress;

    @JsonProperty("start_location")
    public Location startLocation;

    @JsonProperty("steps")
    public List<Step> stepList;
}
