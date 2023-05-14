package com.example.demonew.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int commentid;
    private String body;

    private int postid;
    private int userid;

    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime updated;
}
