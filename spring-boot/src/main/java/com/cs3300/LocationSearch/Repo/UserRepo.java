package com.cs3300.LocationSearch.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs3300.LocationSearch.entities.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
}
