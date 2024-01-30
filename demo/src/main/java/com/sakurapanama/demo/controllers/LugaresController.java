package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.models.Lugar;
import com.sakurapanama.demo.Services.LugaresDB;


@RestController
public class LugaresController 
{

  @GetMapping("/lugares")
  public List<Lugar> obtenerTodosProductos() {
    return new LugaresDB().ObtenerLugares();
  }

  
  @PostMapping("/lugares/agregar")
    public ResponseEntity<String> agregarLugar(@RequestBody Lugar lugar) {
        try 
        {
            new LugaresDB().AgregarLugar(lugar);
            return ResponseEntity.ok("Inserción exitosa");
        } catch (Exception e) 

        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo insertar el lugar");
        }
        
      }

}