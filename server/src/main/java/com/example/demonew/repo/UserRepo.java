package com.example.demonew.repo;

import com.example.demonew.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User, Integer>{
    User findByUsername(String username);


    @Modifying
    @Query("delete from User u where u.userid = ?1")
    void deleteByUserid(int userid);

    @Modifying
    @Query("delete from Post p where p.userid = ?1")
    void deletePostsByUserid(int userid);

}
