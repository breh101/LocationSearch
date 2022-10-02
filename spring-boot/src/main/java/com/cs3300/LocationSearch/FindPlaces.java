package com.cs3300.LocationSearch;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.json.JSONObject;

import java.util.List;
import java.util.Vector;

import java.io.IOException;

@RestController
public class FindPlaces {
    private List<String> getPlacesRecursive(double lat, double lng, double rad, String page_token) {
        String key = "AIzaSyCeePqOFdkdcpqIwBzdgxsA9Y55WxVTXWI";

        OkHttpClient client = new OkHttpClient();
        String api_url = String.format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%f,%f&radius=%f&key=%s", lat, lng, rad, key);
        if (page_token.length() > 0) {
            api_url = String.format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=%s&key=%s", page_token, key);
        }
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

        JSONObject json_data = new JSONObject(data);

        JSONArray results = json_data.getJSONArray("results");
        List<String> places = new Vector<String>();
        for (int i = 0; i < results.length(); i++) {
            places.add(results.getJSONObject(i).getString("place_id"));
        }

        String next_page_token = "";
        try {
            next_page_token = json_data.getString("next_page_token");
            System.out.println(next_page_token);

            places.addAll(getPlacesRecursive(lat, lng, rad, next_page_token));
            return places;
        } catch (JSONException e) {
            return places;
        }
    }

    @GetMapping("/places")
    public String getPlaces(@RequestParam(value="lat") double lat, @RequestParam(value="lng") double lng,  @RequestParam(value="rad") double rad){
        List<String> places = (List<String>) getPlacesRecursive(lat, lng, rad, "");
        return String.join(",", places);
    }
}
