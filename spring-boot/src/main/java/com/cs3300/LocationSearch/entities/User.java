package com.cs3300.LocationSearch.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Document("users")
public class User {
    //User instances
    private @Id Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String password;

    //User constructors
    public User(){}

    public User(String username, String firstName, String lastName, String password) {
        this.id = getIdFromUsername(username);
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public static Long getIdFromUsername(String username) {
        return Long.valueOf(username.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }
//id generator
    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }

    public Long getId() { return id; }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }
}
