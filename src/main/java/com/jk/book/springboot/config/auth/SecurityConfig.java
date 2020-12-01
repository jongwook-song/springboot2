package com.jk.book.springboot.config.auth;

import com.jk.book.springboot.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .headers().frameOptions().disable()
                .and()
                    .authorizeRequests()
                        .antMatchers("/","/css/**"
                                , "/images/**","/js/**","h2-console/**").permitAll()
                        .antMatchers("/api/v1/**").hasRole(Role.USER.name())
                        .anyRequest().authenticated()
//                    .antMatchers("http://localhost:3000/","http://localhost:3000/css/**"
//                            , "http://localhost:3000/images/**","http://localhost:3000/js/**","h2-console/**").permitAll()
//                    .antMatchers("http://localhost:3000/api/v1/**").hasRole(Role.USER.name())
//                    .anyRequest().authenticated()
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
//                        .logoutSuccessUrl("http://localhost:3000/")
                .and()
                    .oauth2Login()
                        .userInfoEndpoint()
                            .userService( customOAuth2UserService);
    }

}
