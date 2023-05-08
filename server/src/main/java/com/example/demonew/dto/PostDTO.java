package com.example.demonew.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private int postid;
    private String caption;
    private String photo;

    private int userid;
    private String username;
    private String avatar;

    private int[] likes;

    private LocalDateTime created;
    private LocalDateTime updated;
}
