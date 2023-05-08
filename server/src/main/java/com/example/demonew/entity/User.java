package com.example.demonew.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity                               //use entity when using tables entities
@NoArgsConstructor
@AllArgsConstructor
@Data                        //for get getters and setters

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;
    private String city;
    private String username;
    private String avatar;


}
