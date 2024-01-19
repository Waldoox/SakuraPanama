package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.LugaresDB;
import com.sakurapanama.demo.models.Lugar;


@RestController
public class LugaresController {

  @GetMapping("/lugares")
  public List<Lugar> ObtenerTodosProductos() {
    return new LugaresDB().ObtenerLugares();
  }}