package com.example.geocodedemo;

import okhttp3.ResponseBody;

import java.io.IOException;

public class DirectionResult
{
    String body;

    public DirectionResult(ResponseBody _body) throws IOException
    {
        body = _body.string();
    }
}
