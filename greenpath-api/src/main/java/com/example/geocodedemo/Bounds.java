package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Bounds
{
    @JsonProperty("northeast")
    public Location northeast;

    @JsonProperty("southwest")
    public Location southwest;
}
