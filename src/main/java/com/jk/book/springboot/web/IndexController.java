package com.jk.book.springboot.web;

import com.jk.book.springboot.service.PostsService;
import com.jk.book.springboot.web.dto.PostsListResponseDto;
import com.jk.book.springboot.web.dto.PostsResponseDto;
import com.jk.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class IndexController {

    private final PostsService postsService;

    @GetMapping("/")
    public List<PostsListResponseDto> index(){
        return postsService.findAllDesc();
//        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave(){
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public PostsResponseDto postsUpdate(@PathVariable Long id){

        PostsResponseDto dto = postsService.findById( id);

        return dto;
    }
}
