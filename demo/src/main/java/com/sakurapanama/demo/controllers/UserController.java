package com.sakurapanama.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.UserDB;
import com.sakurapanama.demo.models.Usuario;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
    
    @GetMapping("/profile-data/{username}")
  public Usuario obtenerPerfil(@PathVariable String username) {
    return new UserDB().ObtenerPerfil(username);
  }

}
