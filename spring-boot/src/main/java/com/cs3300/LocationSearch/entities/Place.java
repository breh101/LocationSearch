package com.cs3300.LocationSearch.entities;

import org.springframework.web.bind.annotation.*;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.json.JSONObject;
import org.json.JSONException;

import java.io.IOException;

@CrossOrigin
@RestController
public class Place {
    @CrossOrigin
    @RequestMapping(value="/place", method = RequestMethod.GET, produces="application/json")
    public String getPlace(@RequestParam(value="place_id") String place_id) {
        String key = "AIzaSyBxLjV86B7Y7lh-NB1dwk_JWy0mYz4MsQM";

        OkHttpClient client = new OkHttpClient();
        String api_url = String.format("https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&key=%s", place_id, key);
        System.out.println(api_url);
        Request request = new Request.Builder()
                .url(api_url)
                .build();

        Response response = null;
        String data = "";
        try {
            response = client.newCall(request).execute();
            data = response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        JSONObject json_data = new JSONObject(data).getJSONObject("result");

        JSONObject result = new JSONObject();
        try {
            result.put("name", json_data.getString("name"));
            result.put("address", json_data.getString("formatted_address"));
            result.put("location", json_data.getJSONObject("geometry").getJSONObject("location"));
            result.put("url", json_data.getString("url"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            result.put("website", json_data.getString("website"));
        } catch (JSONException e) {}
        try {
            result.put("phone", json_data.getString("international_phone_number"));
        } catch (JSONException e) {}
        try {
            result.put("rating", json_data.getDouble("rating"));
        } catch (JSONException e) {}

        return result.toString();
    }
}
