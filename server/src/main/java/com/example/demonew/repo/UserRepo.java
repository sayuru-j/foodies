package com.example.demonew.repo;

import com.example.demonew.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer>{    //exetend by jpa depedency  ,<User,Integer> select entity type to select ,Integer-entity eke primary ID eke data type eka
    User findByUsername(String username);
}
