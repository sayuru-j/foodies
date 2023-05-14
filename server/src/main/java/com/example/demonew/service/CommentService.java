package com.example.demonew.service;

import com.example.demonew.dto.CommentDTO;
import com.example.demonew.dto.PostDTO;
import com.example.demonew.entity.Comment;
import com.example.demonew.entity.Post;
import com.example.demonew.repo.CommentRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private ModelMapper modelMapper;

    // Fetch all comments
    public List<CommentDTO> getAllComments(){
        List<Comment>commentList=commentRepo.findAll();
        return modelMapper.map(commentList,new TypeToken<List<CommentDTO>>(){}.getType());
    }

    // Save a comment
    public CommentDTO saveComment(CommentDTO commentDTO){
        commentRepo.save(modelMapper.map(commentDTO, Comment.class));

        return commentDTO;
    }

    //update a comment
    public CommentDTO updateComment(int commentid, CommentDTO commentDTO) {
        Optional<Comment> optionalComment = commentRepo.findById(commentid);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setBody(commentDTO.getBody());
            commentRepo.save(comment);
            return commentDTO;
        }
        return null;
    }
}
