package com.example.geocodedemo;

import java.util.HashMap;

public class UrlBuilder {
    private String url;
    private HashMap<String, String> fields = new HashMap<String, String>();

    public UrlBuilder(String _url)
    {
        url = _url;
    }

    public void putField(String _key, String _value)
    {
        fields.put(_key, _value);
    }

    public String GetUrl()
    {
        StringBuilder targetUrl = new StringBuilder(url);
        int count = 0;
        for (String i : fields.keySet()) {
            if(count > 0)
                targetUrl.append("&");
            targetUrl.append(i + "=" + fields.get(i));
            ++count;
        }
        return targetUrl.toString();
    }
}