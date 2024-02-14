package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
  public List<String> filtrar(@RequestBody FiltroRequest request) {

    return FiltroRestuarante.filtrarLugares(request.restaurante(), request.variedad(), request.evento());
  }

  static class FiltroRequest {
    private boolean restaurante;
    private boolean variedad;
    private boolean evento;

    public boolean Restaurante() {
      return restaurante;
    }

    public boolean evento() {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'evento'");
    }

    public boolean variedad() {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'variedad'");
    }

    public boolean restaurante() {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'restaurante'");
    }

    public void setRestaurante(boolean restaurante) {
      this.restaurante = restaurante;
    }

    public boolean Variedad() {
      return variedad;
    }

    public void setVariedad(boolean variedad) {
      this.variedad = variedad;
    }

    public boolean Evento() {
      return evento;
    }

    public void setEvento(boolean evento) {
      this.evento = evento;
    }

  }

}