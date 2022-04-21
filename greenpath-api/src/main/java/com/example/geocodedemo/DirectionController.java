package com.example.geocodedemo;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.net.URLEncoder;

@RestController
public class DirectionController {

    final String GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/directions/json?";

    @RequestMapping(path = "/direction", method = RequestMethod.GET )
    public String GetDirection(@RequestParam String destination, @RequestParam String origin) throws IOException {
        OkHttpClient client = new OkHttpClient();
        String encodedOrigin = URLEncoder.encode(origin, "UTF-8");
        String encodedDestination = URLEncoder.encode(destination, "UTF-8");
        UrlBuilder url = new UrlBuilder(GOOGLE_MAPS_API);
        url.putField("origin", encodedOrigin);
        url.putField("destination", encodedDestination);
        url.putField("travelMode", "WALKING");
        url.putField("key", "AIzaSyAnNsnPh-FrN1x_dNAOpkZJdkI7s2E81AI");

        String targetUrl = url.GetUrl();
        Request request = new Request.Builder()
        .url(targetUrl)
        .get()
        .build();
        ResponseBody responseBody = client.newCall(request).execute().body();
        return "Target Url: "+targetUrl+"\n"+responseBody.string();
    }
}