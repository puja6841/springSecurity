package com.example.demo.repository;

import com.example.demo.models.UserDao;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDao, Integer> {
        UserDao findByUsername(String username);
}