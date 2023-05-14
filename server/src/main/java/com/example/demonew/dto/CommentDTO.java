package com.example.demonew.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CommentDTO {
    private int commentid;
    private String body;

    private int postid;
    private int userid;

    private LocalDateTime created;
    private LocalDateTime updated;
}
