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

    public void calculateRouteEmissions(List<Route> routes){
        double routeEmission;
        double legEmission = 0.0;
        for (Route r:routes){
            routeEmission = 0.0;
            for (Leg l:r.legs) {
                legEmission = calculateLegEmissions(l.stepList);
                routeEmission += legEmission;
                l.emissions_leg = legEmission;
            }
            r.emissions = routeEmission;
        }
    }
    public double calculateLegEmissions(List<Step> step){
        double total = 0.0;
        for (Step s:step){
            switch(s.travelMode) {
                case DRIVING:
                    s.emissions = calculateDriving(s.distance.value);
                    total+=s.emissions;
                    break;
                case TRANSIT:
                    s.emissions = calculateBus(s.distance.value);
                    total+=s.emissions;
                    break;
                case WALKING:
                case BICYCLING:
                    s.emissions = 0.0;
                    break;
            }
        }
        return total;
    }

    public double calculateDriving(double meters){
        return meters*DRIVING_EMISSIONS/1000;
    }

    public double calculateBus(double meters){
        return meters*TRANSIT_EMISSIONS/1000;
    }
}
