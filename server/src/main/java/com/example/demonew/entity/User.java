package com.example.demonew.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;
    private String city;
    private String username;
    private String avatar;

    @ElementCollection
    private List<Integer> following = new ArrayList<>();
    @ElementCollection
    private List<Integer> followers = new ArrayList<>();

}
