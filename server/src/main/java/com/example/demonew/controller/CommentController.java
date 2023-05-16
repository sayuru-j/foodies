package com.example.demonew.controller;

import com.example.demonew.dto.CommentDTO;
import com.example.demonew.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/comment")
@CrossOrigin
public class CommentController {
    @Autowired
    private CommentService commentService;

    // Request for get all comments
    @GetMapping("/getComments")
    public List<CommentDTO> getCommets(){
        return commentService.getAllComments();

    }

    // Request for save a comment
    @PostMapping("/saveComment")
    public CommentDTO saveComment(@RequestBody CommentDTO commentDTO){
        return commentService.saveComment(commentDTO);


    }

    // Request for update a comment
    @PutMapping("/updateComment/{commentid}")
    public CommentDTO updateComment(@PathVariable int commentid, @RequestBody CommentDTO commentDTO){
        return commentService.updateComment(commentid, commentDTO);


    }

    // Request to delete a comment
    @DeleteMapping("/deleteComment/{commentid}")
    public boolean deleteComment(@PathVariable int commentid) {
        return commentService.deleteComment(commentid);
    }

}
