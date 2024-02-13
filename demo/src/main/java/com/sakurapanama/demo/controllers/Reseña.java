package com.sakurapanama.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Date;

@RestController
public class Reseña {

    @Autowired
    private ResenaService resenaService;

    @PostMapping("/api/resenas")
    public void agregarResena(@RequestBody ResenaDTO resenaDTO) {
        resenaService.agregarResena(resenaDTO);
    }

    @PostMapping("/api/subir-imagen")
    public String subirImagen(@RequestParam("file") MultipartFile file) {
        // Procesar y guardar la imagen, aquí un ejemplo básico
        // Debes adaptar este código para que maneje correctamente el almacenamiento de la imagen
        String nombreArchivo = "imagen_" + new Date().getTime() + ".jpg";
        // Aquí deberías guardar el archivo, por ejemplo, en un directorio en tu servidor o en un servicio de almacenamiento en la nube
        // En este ejemplo, solo estamos devolviendo el nombre del archivo
        return nombreArchivo;
    }
}