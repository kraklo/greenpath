package com.example.geocodedemo;

import java.util.List;

public class Emissions {
    // Grams per km
    public static final double DRIVING_EMISSIONS = 169.8;
    public static final double TRANSIT_EMISSIONS = 79;
    public int id;
    public Emissions(){
        id = 1;
    }

    public static final String doubleFormat = "%.3f";

    public void calculateRouteEmissions(List<Route> routes){
        double routeEmission;
        double legEmission;
        for (Route r:routes){
            routeEmission = 0.0;
            for (Leg l:r.legs) {
                legEmission = calculateLegEmissions(l.stepList);
                routeEmission += legEmission;
                l.emissions_leg = new TextValue();
                l.emissions_leg.value = legEmission;
                l.emissions_leg.text = String.format(doubleFormat, legEmission);
            }
            r.emissions = new TextValue();
            r.emissions.value = routeEmission;
            r.emissions.text = String.format(doubleFormat, routeEmission);
        }
    }
    public double calculateLegEmissions(List<Step> step){
        double total = 0.0;
        for (Step s:step) {
            s.emissions = new TextValue();
            switch (s.travelMode) {
                case DRIVING:
                    s.emissions.value = calculateDriving(s.distance.value);
                    s.emissions.text = String.format(doubleFormat, s.emissions.value);
                    total += s.emissions.value;
                    break;
                case TRANSIT:
                    s.emissions.value = calculateTransit(s.distance.value);
                    s.emissions.text = String.format(doubleFormat, s.emissions.value);
                    total += s.emissions.value;
                    break;
                case WALKING:
                case BICYCLING:
                    s.emissions.value = 0.0;
                    s.emissions.text = "0.000";
                    break;
            }
        }
        return total;
    }

    public double calculateDriving(double meters){
        return meters*DRIVING_EMISSIONS/1000;
    }
    public double calculateTransit(double meters){
        return meters*TRANSIT_EMISSIONS/1000;
    }
}
