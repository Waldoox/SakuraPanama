package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.Articulo;
import com.sakurapanama.demo.Services.ArticuloService;

@RestController
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @GetMapping("/articulos")
    public List<Articulo> obtenerTodosArticulos() {
        return articuloService.obtenerArticulos();
    }
}
