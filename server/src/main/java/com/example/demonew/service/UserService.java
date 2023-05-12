package com.example.demonew.service;

import com.example.demonew.dto.UserDTO;
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
    private UserRepo userRepo;

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
        userDTO.setFollowing(user.getFollowing());
        userDTO.setFollowers(user.getFollowers());
        return userDTO;
    }


    public boolean userExistsByUsername(String username) {
        User user = userRepo.findByUsername(username);
        return user != null;
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }


    public UserDTO saveUser(UserDTO userDTO) {
        if (userExistsByUsername(userDTO.getUsername())) { //Checks if user exists
            throw new IllegalArgumentException("Username already exists");
        }

        userRepo.save(modelMapper.map(userDTO, User.class)); //Else saves in the db
        return userDTO;
    }


                                                //READ
    public List<UserDTO> getAllUsers(){     //list-get all data by UserDto
        List<User>userList=userRepo.findAll();   //data get from User class/table,userList> reffrence, findAll() >find all data
        return modelMapper.map(userList,new TypeToken<List<UserDTO>>(){}.getType());
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

    public boolean followUser(int uuid, int userId) {

        //Updating followers
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Integer> followers = user.getFollowers();
            if (!followers.contains(uuid)) {
                followers.add(uuid);
                user.setFollowers(followers);
                userRepo.save(user);

                //Updating following
                Optional<User> optionalUser2 = userRepo.findById(uuid);
                if (optionalUser2.isPresent()) {
                    User user2 = optionalUser2.get();
                    List<Integer> following = user2.getFollowing();
                    if (!following.contains(userId)) {
                        following.add(userId);
                        user2.setFollowing(following);
                        userRepo.save(user2);
                        return true;
                    }
                }
            }
        }



        return false;
    }

    public boolean removeFollow(int uuid, int userId) {

        //Update followers
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Integer> followers = user.getFollowers();
            if (followers.removeIf(id -> id == uuid)) {
                user.setFollowers(followers);
                userRepo.save(user);

                //Updating following
                Optional<User> optionalUser2 = userRepo.findById(uuid);
                if (optionalUser2.isPresent()) {
                    User user2 = optionalUser2.get();
                    List<Integer> following = user2.getFollowing();
                    if (following.removeIf(id -> id == userId)) {
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
