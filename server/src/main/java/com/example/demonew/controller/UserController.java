package com.example.demonew.controller;
import com.example.demonew.dto.UserDTO;
import com.example.demonew.entity.User;
import com.example.demonew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value ="api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;                     //gets userService

    @GetMapping("/getUsers")
    public List<UserDTO> getUser(){       //method in class ,objects get by userDto
        return userService.getAllUsers();

    }

    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.convertToDTO(user), HttpStatus.OK);
    }




    @PostMapping("/saveUser")
    public ResponseEntity<UserDTO> saveUser(@RequestBody UserDTO userDTO) {
        try {
            UserDTO savedUser = userService.saveUser(userDTO);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("/userUpdate")
    public UserDTO updateUser(@RequestBody UserDTO userDTO){
        return  userService.updateUser(userDTO);


    }
    @DeleteMapping("/userDelete")
    public boolean deleteUser(@RequestBody UserDTO userDTO){          //update the object by UserDTO ,can you Id also
        return userService.deleteUser(userDTO);



    }

    @PostMapping("/followUser")
    public boolean followUser(@RequestParam int uuid, @RequestParam int userId) {
        return userService.followUser(uuid, userId);
    }

    @PostMapping("/unfollowUser")
    public boolean unfollowUser(@RequestParam int uuid, @RequestParam int userId) {
        return userService.removeFollow(uuid, userId);
    }


}

