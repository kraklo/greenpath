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
}
