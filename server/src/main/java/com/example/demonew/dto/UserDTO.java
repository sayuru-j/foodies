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
    private String avatar;

    private List<Integer> following;
    private List<Integer> followers;
}
