package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DirectionsPolyline {
    @JsonProperty("points")
    public String points;
}
