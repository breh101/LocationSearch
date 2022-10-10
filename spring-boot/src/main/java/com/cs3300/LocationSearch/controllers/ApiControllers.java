package com.cs3300.LocationSearch.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs3300.LocationSearch.Repo.UserRepo;
import com.cs3300.LocationSearch.entities.User;

@CrossOrigin
@RestController
public class ApiControllers {

    @Autowired
    UserRepo userRepo;

    @CrossOrigin
    @GetMapping(value = "/")
    public String getPage() {
        return "Welcome";
    }

    //get/read method
    @CrossOrigin
    @GetMapping(value = "/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    //get by id method
    @CrossOrigin
    @GetMapping("/users/{username}")
    public String getUserByUsername(@PathVariable String username) {
        try {
            User user = userRepo.findById(User.getIdFromUsername(username)).get();
            return user.toString();
        } catch (NoSuchElementException e) {
            return "";
        }
    }

    //post/create method
    @CrossOrigin
    @PostMapping(value = "/create")
    public String createUser(@RequestParam String username, @RequestParam(defaultValue = "") String firstName,
    @RequestParam(defaultValue = "") String lastName, @RequestParam String password) {
        User toSave = new User(username, firstName, lastName, password);
        userRepo.save(toSave);
        return "User with username " + username + " has been added.";
    }

    //delete method
    @CrossOrigin
    @DeleteMapping("/delete/{username}")
    public String deleteUser(@PathVariable String username) {
        User deleteUser = userRepo.findById(User.getIdFromUsername(username)).get();
        userRepo.delete(deleteUser);
        return "User with username " + username + " has been deleted.";
    }

    //update/put method
    @CrossOrigin
    @PutMapping(value = "/update/{username}")
    public String updateUser(@RequestBody User user, @PathVariable String username) {
        User updatedUser = userRepo.findById(User.getIdFromUsername(username)).get();
        updatedUser.setPassword(user.getPassword());
        userRepo.save(updatedUser);
        return "User with username " + username + " has been updated.";
    }

    @CrossOrigin
    @GetMapping(value = "/match/")
    public boolean matchUser(@RequestParam String username, @RequestParam String password) {
        try {
            User user = userRepo.findById(User.getIdFromUsername(username)).get();
            return (user.getPassword().equals(password));
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
