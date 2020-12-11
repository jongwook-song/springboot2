package com.jk.book.springboot.web;

import com.jk.book.springboot.config.auth.dto.SessionUser;
import com.jk.book.springboot.domain.user.LoginUser;
import com.jk.book.springboot.service.PostsService;
import com.jk.book.springboot.web.dto.PostsListResponseDto;
import com.jk.book.springboot.web.dto.PostsResponseDto;
import com.jk.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/main")
public class IndexController {

    private final PostsService postsService;

    @GetMapping
    public Map<String, Object> index(@LoginUser SessionUser user){
        HashMap<String, Object> map = new HashMap<String, Object>();
        List<PostsListResponseDto> postsListResponseDtos = postsService.findAllDesc();

        map.put( "list", postsListResponseDtos);

        if( user != null){
            map.put("user", user);
        }

        return map;
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
