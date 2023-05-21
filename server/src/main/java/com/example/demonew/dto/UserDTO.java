package com.example.demonew.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private long userid;
    private String city;
    private String username;
    private String email;
    private String fullname;
    private String avatar;
    private String bio;

    private List<Integer> following;
    private List<Integer> followers;
}
