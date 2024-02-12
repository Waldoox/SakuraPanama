package com.sakurapanama.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Controller
public class ImagenController {

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