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
    @GetMapping("/users/{username}")
    public String getUserByUsername(@PathVariable String username) {
        User user = userRepo.findById(User.getIdFromUsername(username)).get();
        return user.toString();
    }

    //post/create method
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/create")
    public String createUser(@RequestParam String username, @RequestParam String firstName, 
    @RequestParam String lastName, @RequestParam String password) {
        User toSave = new User(username, firstName, lastName, password);
        if (userRepo.findAll().contains(toSave)) {
            toSave = userRepo.findById(User.getIdFromUsername(username)).get();
            userRepo.save(toSave);
            return "User with username " + username + " already exists.";
        }
        userRepo.save(toSave);
        return "User with username " + username + " has been added.";
    }

    //delete method
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{username}")
    public String deleteUser(@PathVariable String username) {
        User deleteUser = userRepo.findById(User.getIdFromUsername(username)).get();
        userRepo.delete(deleteUser);
        return "User with username " + username + " has been deleted.";
    }

    //update/put method
    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping(value = "/update/{username}")
    public String updateUser(@RequestBody User user, @PathVariable String username) {
        User updatedUser = userRepo.findById(User.getIdFromUsername(username)).get();
        updatedUser.setPassword(user.getPassword());
        userRepo.save(updatedUser);
        return "User with username " + username + " has been updated.";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/match/")
    public boolean matchUser(@RequestParam String username, @RequestParam String password) {
        User user = userRepo.findById(User.getIdFromUsername(username)).get();
        return (user.getPassword().equals(password));
    }
}
