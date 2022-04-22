package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Location
{
    @JsonProperty("lat")
    public float latitude;

    @JsonProperty("lng")
    public float longitude;
}
