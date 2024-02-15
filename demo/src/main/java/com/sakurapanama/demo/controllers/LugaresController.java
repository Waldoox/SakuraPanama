package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.models.Lugar;
import com.sakurapanama.demo.services.LugaresDB;
import com.sakurapanama.demo.services.LugaresDB.FiltroRestuarante;

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

  /**
   * @param request
   * @return
   */
  @PostMapping("/filtrar")
  public List<Lugar> filtrar(
      @RequestParam(name = "restaurante", required = false, defaultValue = "false") boolean restaurante,
      @RequestParam(name = "variedad", required = false, defaultValue = "false") boolean variedad,
      @RequestParam(name = "evento", required = false, defaultValue = "false") boolean evento) {

    if (restaurante) {
      return new LugaresDB().ObtenerRestaurantes();
    } else {
      // Lógica para manejar otros tipos de filtros si es necesario
    }
    return null;
  }

}