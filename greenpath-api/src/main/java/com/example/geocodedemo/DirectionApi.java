package com.example.geocodedemo;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;

import java.io.IOException;
import java.net.URLEncoder;

public class DirectionApi {
    final String GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/directions/json?";
    final String API_KEY = "AIzaSyAnNsnPh-FrN1x_dNAOpkZJdkI7s2E81AI";

    private String origin;
    private String destination;
    private TravelMode mode = TravelMode.DRIVING;

    private boolean alt_routes = true;

    public DirectionApi(String _origin, String _destination) {
        origin(_origin);
        destination(_destination);
    }

    public DirectionApi origin(String _origin)
    {
        origin = _origin;
        return this;
    }

    public DirectionApi destination(String _destination)
    {
        destination = _destination;
        return this;
    }

    public DirectionApi mode(TravelMode _mode)
    {
        mode = _mode;
        return this;
    }

    public String getUrl()
    {
        UrlBuilder url = new UrlBuilder(GOOGLE_MAPS_API);
        url.putField("origin", origin);
        url.putField("destination", destination);
        url.putField("mode", mode.toString());
        url.putField("alternatives", String.valueOf(alt_routes));
        url.putField("key", API_KEY);
        return url.GetUrl();
    }

    public DirectionResult getResult(TravelMode travelMode) throws IOException
    {
        OkHttpClient client = new OkHttpClient();
        String targetUrl = getUrl();

        Request request = new Request.Builder()
                .url(targetUrl)
                .get()
                .build();
        ResponseBody responseBody = client.newCall(request).execute().body();

        ObjectMapper objectMapper = new ObjectMapper();
        DirectionResult result = objectMapper.readValue(responseBody.string(), DirectionResult.class);
        for (Route r:result.routeList){
            r.type = travelMode;
        }
        return result;
    }
}
