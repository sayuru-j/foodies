package com.example.demonew.repo;

import com.example.demonew.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer>{
    User findByUsername(String username);
}
