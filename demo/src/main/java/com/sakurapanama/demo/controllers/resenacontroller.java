package com.sakurapanama.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaService resenaService;

    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @PostMapping("/subir-imagen/{idLugar}")
    public ResponseEntity<String> subirImagen(@RequestParam("file") MultipartFile file, @PathVariable Long idLugar) {
        // Aquí procesarías la imagen y la guardarías en la base de datos asociada al idLugar
        // Retorna un mensaje de éxito o error según corresponda
        return ResponseEntity.ok("Imagen subida exitosamente.");
    }

    @PostMapping("/{idLugar}/agregar-resena")
    public ResponseEntity<String> agregarResena(@PathVariable Long idLugar, @RequestBody Resena resena) {
        // Aquí procesarías la reseña y la guardarías en la base de datos asociada al idLugar
        // Retorna un mensaje de éxito o error según corresponda
        return ResponseEntity.ok("Reseña agregada exitosamente.");
    }

    // Otros métodos del controlador según sea necesario
}