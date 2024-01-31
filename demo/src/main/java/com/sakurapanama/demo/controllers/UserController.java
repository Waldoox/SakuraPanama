package com.sakurapanama.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;

import com.sakurapanama.demo.Services.UserDB;

import com.sakurapanama.demo.models.Usuario;

public class UserController {
    
    @GetMapping("/profile-data")
  public Usuario obtenerTodosProductos(String username) {
    return new UserDB().ObtenerPerfil(username);
  } 
}
