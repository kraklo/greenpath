package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GeocodedWaypoint
{
    @JsonProperty("geocoder_status")
    public String geocoderStatus;

    @JsonProperty("partial_match")
    public boolean partialMatch;

    @JsonProperty("place_id")
    public String placeId;

    @JsonProperty("types")
    public List<String> types;
}
