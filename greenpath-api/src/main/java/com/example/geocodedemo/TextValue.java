package com.example.geocodedemo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TextValue
{
    @JsonProperty("text")
    public String text;

    @JsonProperty("value")
    public float value;
}
