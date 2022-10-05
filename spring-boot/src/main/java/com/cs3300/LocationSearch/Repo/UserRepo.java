package com.cs3300.LocationSearch.Repo;

import com.cs3300.LocationSearch.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;


@Service
public interface UserRepo extends MongoRepository<User, Long> {
}
