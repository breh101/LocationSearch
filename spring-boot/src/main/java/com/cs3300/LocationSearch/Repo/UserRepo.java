package com.cs3300.LocationSearch.Repo;
import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;

import com.cs3300.LocationSearch.entities.User;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public interface UserRepo extends FirestoreReactiveRepository<User> {
    Flux<User> findAll();

    Mono<Void> delete(User toDelete);

    User findById(long id);

    <S extends User> Mono<S> save(S entity);
}
