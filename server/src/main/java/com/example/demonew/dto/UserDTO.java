package com.example.demonew.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private long userid;
    private String city;
    private String username;
    private String avatar;
}
