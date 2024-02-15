package com.sakurapanama.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.amqp.RabbitProperties.Cache.Connection;
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

  @GetMapping("/filtrar")
  public List<Lugar> obtenerDatos(String[] tipos) {
    LugaresDB lugaresdb = new LugaresDB();
    List<Lugar> lugares = new ArrayList<>();
    for (String tipo : tipos) {
      switch (tipo) {
        case "restaurante":
          lugares.addAll(lugaresdb.ObtenerRestaurantes());
          break;
        case "tienda":
          lugares.addAll(lugaresdb.ObtenerTiendas());
          break;
        case "variedad":
          lugares.addAll(lugaresdb.ObtenerVariedades());
          break;
      }
    }
    return lugares;
  }

}