package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.ArticulosDB;
import com.sakurapanama.demo.models.Articulo;




@RestController
public class ArticuloController {
  //esta solo llama a los metodos de las otras dos clases y la manda al navegador
@GetMapping("/articulos")
  public List<Articulo> ObtenerTodosArticulo() {
    return new ArticulosDB().obtenerArticulos();
  }
    
}

