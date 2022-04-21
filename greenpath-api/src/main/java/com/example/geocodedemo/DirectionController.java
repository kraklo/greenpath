package com.example.geocodedemo;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.net.URLEncoder;

@RestController
public class DirectionController {
    @RequestMapping(path = "/direction", method = RequestMethod.GET )
    public String GetDirection(@RequestParam String destination, @RequestParam String origin) throws IOException {
        OkHttpClient client = new OkHttpClient();
        String encodedOrigin = URLEncoder.encode(origin, "UTF-8");
        String encodedDestination = URLEncoder.encode(destination, "UTF-8");
        String url = "https://maps.googleapis.com/maps/api/directions/json?origin="+encodedOrigin+"&destination="+encodedDestination+"&key=AIzaSyAnNsnPh-FrN1x_dNAOpkZJdkI7s2E81AI\n";
        Request request = new Request.Builder()
        .url(url)
        .get()
        .build();
        ResponseBody responseBody = client.newCall(request).execute().body();
        return "Target Url: "+url+"\n"+responseBody.string();
    }
}