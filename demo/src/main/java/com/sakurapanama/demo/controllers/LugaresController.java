package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.LugaresService;
import com.sakurapanama.demo.models.Lugar;

@RestController
public class LugaresController {

    @Autowired
    private LugaresService lugaresService;

    @GetMapping("/lugares")
    public List<Lugar> obtenerTodosLugares() {
        return lugaresService.obtenerLugares();
    }
}
