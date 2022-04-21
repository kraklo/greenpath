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
        Request request = new Request.Builder()
                .url("https://google-maps28.p.rapidapi.com/maps/api/directions/json?language=en&destination=" + encodedDestination + "&origin=" + encodedOrigin)
                .get()
                .addHeader("x-rapidapi-host", "google-maps28.p.rapidapi.com")
                .addHeader("x-rapidapi-key", "b635c1a042msh42c1f3d59464a4ep140ee4jsn586d1a6e07a0")
                .build();
        ResponseBody responseBody = client.newCall(request).execute().body();
        return responseBody.string();
    }
}