package com.cs3300.LocationSearch.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs3300.LocationSearch.Repo.UserRepo;
import com.cs3300.LocationSearch.entities.User;

@RestController
public class ApiControllers {

    @Autowired
    UserRepo userRepo;

    @GetMapping(value = "/")
    public String getPage() {
        return "Welcome";
    }

    //get/read method
    @GetMapping(value = "/users")
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    //get by id method
    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable long id) {
        User user = userRepo.findById(id).get();
        return "User: " + user + " has been found.";
    }

    //post/create method
    @PostMapping(value = "/create")
    public String createUser(@PathVariable String firstName, @PathVariable String lastName) {
        User toSave = new User(firstName, lastName);
        userRepo.save(toSave);
        return "User with name " + toSave.getFirstName() + " has been added.";
    }

    //delete method
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable long id) {
        User deleteUser = userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "User with id " + id + " has been deleted.";
    }

    //update/put method
    @PutMapping(value = "/update/{id}")
    public String updateUser(@RequestBody User user, @PathVariable long id) {
        User updatedUser = userRepo.findById(id).get();
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        userRepo.save(updatedUser);
        return "User with " + user.getId() + "has been updated.";
    }
}
