package com.cs3300.LocationSearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class }, scanBasePackages={
		"com.cs3300.LocationSearch.controllers", "com.cs3300.LocationSearch.entities", "com.cs3300.LocationSearch.Repo"})
public class LocationSearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(LocationSearchApplication.class, args);
	}

}
