package com.example.demonew.controller;

import com.example.demonew.dto.PostDTO;
import com.example.demonew.dto.UserDTO;
import com.example.demonew.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/post")
@CrossOrigin
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/getPosts")
    public List<PostDTO> getUser(){       //method in class ,objects get by userDto
        return postService.getAllPosts();

    }

    @PostMapping("/savePost")
    public PostDTO savePost(@RequestBody PostDTO postDTO){
        return postService.savePost(postDTO);


    }

    //Delete by PostId
    @DeleteMapping("/deletePost/{postid}")
    public boolean deletePost(@PathVariable int postid) {
        return postService.deletePost(postid);
    }

}
