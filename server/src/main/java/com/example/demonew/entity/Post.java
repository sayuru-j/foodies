package com.example.demonew.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int postid;
    private String caption;
    private String photo;

    private int userid;
    private String username;
    private String avatar;

    private int[] likes;

    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime updated;

}
