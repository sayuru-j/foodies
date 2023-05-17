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
        List<Post>postList=postRepo.findAll();
        return modelMapper.map(postList,new TypeToken<List<PostDTO>>(){}.getType());
    }

    //save
    public PostDTO savePost(PostDTO postDTO){
        postRepo.save(modelMapper.map(postDTO, Post.class));

        return postDTO;
    }

    //update
    public PostDTO updatePost(int postId, PostDTO postDTO) {
        Optional<Post> optionalPost = postRepo.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setCaption(postDTO.getCaption());      // Updates caption
            postRepo.save(post);
            return postDTO;
        }
        return null;
    }

    public boolean deletePost(int postid) {
        postRepo.deleteByPostid(postid);
        return true;
    }

    public boolean addLike(int postId, int userId) {
        Optional<Post> optionalPost = postRepo.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            List<Integer> likes = post.getLikes();
            if (!likes.contains(userId)) {
                likes.add(userId);
                post.setLikes(likes);
                postRepo.save(post);
                return true;
            }
        }
        return false;
    }

    public boolean removeLike(int postId, int userId) {
        Optional<Post> optionalPost = postRepo.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            List<Integer> likes = post.getLikes();
            if (likes.contains(userId)) {
                likes.remove(Integer.valueOf(userId));
                post.setLikes(likes);
                postRepo.save(post);
                return true;
            }
        }
        return false;
}



}
