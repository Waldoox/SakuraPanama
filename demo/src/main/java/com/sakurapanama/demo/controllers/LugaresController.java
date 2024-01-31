package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.models.Lugar;
import com.sakurapanama.demo.Services.LugaresDB;


@RestController
public class LugaresController {

  @GetMapping("/all")
  public List<Lugar> ObtenerTodosLugares() {
    return new LugaresDB().ObtenerLugares();
  }

  @GetMapping("/restaurantes")
  public List<Lugar> ObtenerRestaurantes() {
    return new LugaresDB().ObtenerRestaurantes();
  }

  @GetMapping("/tiendas")
  public List<Lugar> ObtenerTiendas() {
    return new LugaresDB().ObtenerTiendas();
  }

  @GetMapping("/variedades")
  public List<Lugar> ObtenerVariedades() {
    return new LugaresDB().ObtenerVariedades();
  }

}