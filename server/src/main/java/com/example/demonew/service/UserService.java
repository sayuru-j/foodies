package com.example.demonew.service;

import com.example.demonew.dto.PostDTO;
import com.example.demonew.dto.UserDTO;
import com.example.demonew.entity.Post;
import com.example.demonew.entity.User;
import com.example.demonew.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//GET
@Service                      //if this service class you need to notify that in @Service annotation
@Transactional                   //data validation annotation
public class UserService {
    @Autowired
    private UserRepo userRepo;    //allow dependency injection using classes, inject here

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserid(user.getUserid());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullname(user.getFullname());
        userDTO.setCity(user.getCity());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setBio(user.getBio());
        userDTO.setFollowing(user.getFollowing());
        userDTO.setFollowers(user.getFollowers());
        return userDTO;
    }


    public boolean userExistsByUsername(String username) {                           //get user
        User user = userRepo.findByUsername(username);
        return user != null;
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }


    public UserDTO saveUser(UserDTO userDTO) {                                             //save user
        if (userExistsByUsername(userDTO.getUsername())) { //Checks if user exists
            throw new IllegalArgumentException("Username already exists");
        }

        userRepo.save(modelMapper.map(userDTO, User.class)); // if user not in db,then saves in the db
        return userDTO;
    }


                                                //READ
    public List<UserDTO> getAllUsers(){     //list-get all data as list by UserDto
        List<User>userList=userRepo.findAll();   //data get from User class/table,userList> reffrence, findAll() >find all data
        return modelMapper.map(userList,new TypeToken<List<UserDTO>>(){}.getType());
    }

    //update USER BIO BY USERID
    public UserDTO updateUserbio(int userid,  UserDTO userDTO) {
        Optional<User> optionalPost = userRepo.findById(userid);
        if (optionalPost.isPresent()) {
            User user = optionalPost.get();
            user.setBio(userDTO.getBio());          // Updates caption
            userRepo.save(user);
            return userDTO;
        }
        return null;
    }

    public boolean deleteUser(int userid) {
        userRepo.deleteByUserid(userid);
        userRepo.deletePostsByUserid(userid);
        return true;
    }



                                             //UPDATE
    public UserDTO updateUser(UserDTO userDTO){
        userRepo.save(modelMapper.map(userDTO,User.class));
        return userDTO;

    }

                                               //DELETE
     public boolean deleteUser(UserDTO userDTO) {           //can user user ID for delete
     userRepo.delete(modelMapper.map(userDTO,User.class));
     return true;                //if you want you can add if else validation also,if update yes then return true
    }

    public boolean followUser(int uuid, int userId) {    //vvid other user  //UserId - sameuser

        //Updating followers       //count the user followers
        Optional<User> optionalUser = userRepo.findById(userId);    //find user by id,  optionalUser - Optional object
        if (optionalUser.isPresent()) {       // check if the Optional object contains a value
            User user = optionalUser.get();       //get the present value to user
            List<Integer> followers = user.getFollowers(); //display the current follweers if user comes from there id
            if (!followers.contains(uuid)) {   //user comes from there userId AND there are not contains vvid,then user can follow other profiles
                followers.add(uuid);                 //then add vvid to userID
                user.setFollowers(followers);             //set follwers to user ,followed by vvid user
                userRepo.save(user);                       //save user

                //Updating following someone profile
                Optional<User> optionalUser2 = userRepo.findById(uuid);       //find user by id,  optionalUser - Optional object
                if (optionalUser2.isPresent()) {               // check if the Optional object contains vvId
                    User user2 = optionalUser2.get();          //if yes get the present value to user
                    List<Integer> following = user2.getFollowing();    //if user comes from vvid,show the following by other user, and vvid user can follow them also
                    if (!following.contains(userId)) {      //if user id not contains
                        following.add(userId);              //take the userId
                        user2.setFollowing(following);       //set follow to that userId
                        userRepo.save(user2);                //save following to above user by userRepo
                        return true;
                    }
                }
            }
        }



        return false;
    }

    public boolean removeFollow(int uuid, int userId) {              //delete followers

        //Update followers                                       //already loggin user
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Integer> followers = user.getFollowers();
            if (followers.removeIf(id -> id == uuid)) {          //remove follower list by there vvid
                user.setFollowers(followers);
                userRepo.save(user);                                       //set follwers

                //Updating following                                 //outside user suggestion users
                Optional<User> optionalUser2 = userRepo.findById(uuid);
                if (optionalUser2.isPresent()) {                         //they cant remove edit others following status,only they can see that status
                    User user2 = optionalUser2.get();
                    List<Integer> following = user2.getFollowing();
                    if (following.removeIf(id -> id == userId)) {        //remove the follow list by userId
                        user2.setFollowing(following);
                        userRepo.save(user2);
                        return true;
                    }


                }
            }
        }
        return false;
    }



}
