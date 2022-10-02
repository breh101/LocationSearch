package com.cs3300.LocationSearch;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

public class CurrentLocation {
    //Establishes URL Connection with support for HTTP - specific features
    private static HttpURLConnection connection;

    private static String parseAddress(String address) {
        Scanner addr = new Scanner(address);
        String parsedAddr = "";
        while (addr.hasNext()) {
            parsedAddr += addr + "%20";
        }
        addr.close();
        return parsedAddr;
    }
    public static void main(String[] args) {
        System.out.println(parseAddress("3963 Otter Dam Ct Atlanta GA"));
        try {
            URL url = new URL("https://maps.googleapis.com/maps/api/geocode/json?address=3963%20Otter%20Dam%20Court%20Atlanta%20GA&key=AIzaSyCeePqOFdkdcpqIwBzdgxsA9Y55WxVTXWI");
            connection = (HttpURLConnection) url.openConnection();

            //request setup
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.getReadTimeout();

            int status = connection.getResponseCode();
            System.out.println(status);
            
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }
}
