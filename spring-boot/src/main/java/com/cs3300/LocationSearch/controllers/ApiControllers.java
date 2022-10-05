package com.cs3300.LocationSearch.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs3300.LocationSearch.Repo.UserRepo;
import com.cs3300.LocationSearch.entities.User;

@CrossOrigin
@RestController
public class ApiControllers {

    @Autowired
    UserRepo userRepo;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/")
    public String getPage() {
        return "Welcome";
    }

    //get/read method
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    //get by id method
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable long id) {
        User user = userRepo.findById(id).get();
        return "User: " + user + " has been found.";
    }

    //post/create method
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/create")
    public String createUser(@RequestParam String firstName, @RequestParam String lastName) {
        User toSave = new User(firstName, lastName);
        userRepo.save(toSave);
        return "User with name " + toSave.getFirstName() + " has been added.";
    }

    //delete method
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable long id) {
        User deleteUser = userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "User with id " + id + " has been deleted.";
    }

    //update/put method
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/update/{id}")
    public String updateUser(@RequestBody User user, @PathVariable long id) {
        User updatedUser = userRepo.findById(id).get();
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        userRepo.save(updatedUser);
        return "User with " + user.getId() + "has been updated.";
    }
}
