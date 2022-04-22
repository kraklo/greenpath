package com.example.geocodedemo;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.net.URLEncoder;


@RestController
public class DirectionController {
    @RequestMapping(path = "/direction", method = RequestMethod.GET )
    public DirectionResult getDirection(@RequestParam String origin, @RequestParam String destination) throws IOException {
        DirectionApi requestTest = new DirectionApi(origin, destination);
        DirectionResult transitResult = requestTest.mode(TravelMode.TRANSIT).getResult(TravelMode.TRANSIT);
        DirectionResult walkingResult = requestTest.mode(TravelMode.WALKING).getResult(TravelMode.WALKING);
        DirectionResult drivingResult = requestTest.mode(TravelMode.DRIVING).getResult(TravelMode.DRIVING);
        DirectionResult bicyclingResult = requestTest.mode(TravelMode.BICYCLING).getResult(TravelMode.BICYCLING);

        Emissions em = new Emissions();
        em.calculateRouteEmissions(transitResult.routeList);
        em.calculateRouteEmissions(walkingResult.routeList);
        em.calculateRouteEmissions(drivingResult.routeList);
        em.calculateRouteEmissions(bicyclingResult.routeList);

        DirectionResult finalResult = walkingResult;
        finalResult.routeList.addAll(bicyclingResult.routeList);
        finalResult.routeList.addAll(transitResult.routeList);
        finalResult.routeList.addAll(drivingResult.routeList);

        String savedUrl = requestTest.getUrl();

        return finalResult;
    }
}