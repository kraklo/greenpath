package com.example.geocodedemo;

import java.util.Locale;

public enum TravelMode {
    DRIVING,
    BICYCLING,
    TRANSIT,
    WALKING;

    @Override
    public String toString()
    {
        return name().toLowerCase(Locale.ENGLISH);
    }
}
