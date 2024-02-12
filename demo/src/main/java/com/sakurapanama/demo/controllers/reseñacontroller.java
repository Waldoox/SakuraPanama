package com.sakurapanama.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {
    private final ResenaService resenaService;

    @Autowired
    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @GetMapping
    public ResponseEntity<List<Resena>> obtenerTodasLasResenas() {
        List<Resena> resenas = resenaService.obtenerTodasLasResenas();
        return new ResponseEntity<>(resenas, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Resena> crearResena(@RequestBody Resena resena) {
        Resena nuevaResena = resenaService.guardarResena(resena);
        return new ResponseEntity<>(nuevaResena, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarResena(@PathVariable("id") Long idResena) {
        resenaService.eliminarResena(idResena);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}