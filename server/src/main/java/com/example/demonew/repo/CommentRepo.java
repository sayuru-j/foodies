package com.example.demonew.repo;

import com.example.demonew.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
    @Modifying
    @Query("delete from Comment c where c.commentid = ?1")
    void deleteByCommentid(int commentid);
}
