package com.example.demo.service;

import com.example.demo.models.UserDao;
import com.example.demo.models.UserDto;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;

class JwtUserDetailsServiceTest {

    @Autowired
    JwtUserDetailsService userService;

    @MockBean
    UserRepository userRepo;
    @Test
    void loadUserByUsername() throws Exception {
        UserDao u=new UserDao();
        u.setUsername("deep");

        UserDto d=new UserDto();
        d.setUsername("deep");
        String username="deep";
        Mockito.when(userRepo.save(u)).thenReturn(u);

        assertThat(userService.save(d)).isEqualTo(u);

    }

    @Test
    void testsave() throws Exception{
        UserDao u=new UserDao();
        u.setUsername("deep");
        u.setPassword("deep@123");

        UserDto d=new UserDto();
        d.setUsername("deep");
        d.setPassword("deep@123");
        Mockito.when(userRepo.save(u)).thenReturn(u);

        assertThat(userService.save(d)).isEqualTo(u);

    }
}