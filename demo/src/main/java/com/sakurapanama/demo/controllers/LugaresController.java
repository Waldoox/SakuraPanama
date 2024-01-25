package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.models.Lugar;
import com.sakurapanama.demo.Services.LugaresDB;


@RestController
public class LugaresController {

  @GetMapping("/lugares")
  public List<Lugar> ObtenerTodosLugares() {
    return new LugaresDB().ObtenerLugares();
  }}