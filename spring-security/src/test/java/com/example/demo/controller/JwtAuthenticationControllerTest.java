package com.example.demo.controller;

import com.example.demo.models.UserDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.xml.ws.Response;
import java.awt.*;

import static org.junit.jupiter.api.Assertions.*;

class JwtAuthenticationControllerTest {

    ObjectMapper om=new ObjectMapper();

    private MockMvc mockMvc;


    @Test
    void testsaveUser() throws Exception{
        UserDao user=new UserDao();
        user.setUsername("tia");
        user.setPassword("tia@123");
        String jsonRequest = om.writeValueAsString(user);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post("/register").content(jsonRequest).
                content(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Response response= om.readValue(resultContent, Response.class);
        assertEquals(HttpStatus.OK.value(), response.isDone());

    }
}