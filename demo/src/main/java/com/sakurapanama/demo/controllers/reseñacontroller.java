package com.sakurapanama.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
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

    @Autowired
    private ImagenRepository imagenRepository;

    @GetMapping("/imagenes")
    @ResponseBody
    public List<Imagen> obtenerImagenes() {
        return imagenRepository.findAll();
    }

    @PostMapping("/subir-imagen")
    @ResponseBody
    public String subirImagen(@RequestParam("file") MultipartFile file) throws IOException {
        Imagen imagen = new Imagen();
        imagen.setImagenurl("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(file.getBytes()));
        imagenRepository.save(imagen);
        return "Imagen subida exitosamente.";
    }

    @DeleteMapping("/eliminar-imagen/{id}")
    @ResponseBody
    public String eliminarImagen(@PathVariable Integer id) {
        imagenRepository.deleteById(id);
        return "Imagen eliminada exitosamente.";
    }


}