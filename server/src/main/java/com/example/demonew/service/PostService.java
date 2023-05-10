package com.example.demonew.service;

import com.example.demonew.dto.PostDTO;
import com.example.demonew.entity.Post;
import com.example.demonew.repo.PostRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public PostDTO updatePost(int postId, PostDTO postDTO) {
        Optional<Post> optionalPost = postRepo.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setCaption(postDTO.getCaption());
            post.setPhoto(postDTO.getPhoto());
            // set any other fields you want to update
            postRepo.save(post);
            return postDTO;
        }
        return null;
    }


    public boolean deletePost(int postid) {
        postRepo.deleteByPostid(postid);
        return true;
    }
}
