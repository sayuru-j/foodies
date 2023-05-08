package com.example.demonew.repo;

import com.example.demonew.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostRepo extends JpaRepository<Post, Integer> {
    @Modifying
    @Query("delete from Post p where p.postid = ?1")
    void deleteByPostid(int postid);
}
