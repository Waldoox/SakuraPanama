package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.models.Lugar;

import lombok.RequiredArgsConstructor;

import com.sakurapanama.demo.Services.LugaresDB;



@RestController
@RequiredArgsConstructor
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
  
    private final LugaresDB lugaresDB;

  @PostMapping("/añadirLugar")
    public ResponseEntity<String> añadirLugar(@RequestBody Lugar lugar) {
        boolean insercionExitosa = lugaresDB.añadirLugar(lugar);
        if (insercionExitosa) {
            return ResponseEntity.ok("El local ha sido añadido correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error al añadir el local. Por favor, inténtelo de nuevo más tarde.");
        }
    }

}