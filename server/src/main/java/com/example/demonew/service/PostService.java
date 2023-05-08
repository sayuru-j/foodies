package com.example.demonew.service;

import com.example.demonew.dto.PostDTO;
import com.example.demonew.dto.UserDTO;
import com.example.demonew.entity.Post;
import com.example.demonew.entity.User;
import com.example.demonew.repo.PostRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private ModelMapper modelMapper;

    //get
    public List<PostDTO> getAllPosts(){
        List<Post>userList=postRepo.findAll();
        return modelMapper.map(userList,new TypeToken<List<PostDTO>>(){}.getType());
    }

    //save
    public PostDTO savePost(PostDTO postDTO){
        postRepo.save(modelMapper.map(postDTO, Post.class));

        return postDTO;
    }

    public boolean deletePost(int postid) {
        postRepo.deleteByPostid(postid);
        return true;
    }
}
