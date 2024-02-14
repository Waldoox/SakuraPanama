package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.sakurapanama.demo.Services.ResenaDB;
import com.sakurapanama.demo.models.Resena;

public class ResenaController {

    private final ResenaDB resenaDB = new ResenaDB();

    @PostMapping("/añadirLugar")
    public ResponseEntity<String> añadirResena(@RequestBody Resena resena) {
        boolean insercionExitosa = resenaDB.añadirResena(resena);
        if (insercionExitosa) {
            return ResponseEntity.ok("El local ha sido añadido correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error al añadir el local. Por favor, inténtelo de nuevo más tarde.");
        }
    }

    @GetMapping("/obtenerResenas")
    public List<Resena> ObtenerResenas(int id_lugar) {
     return new ResenaDB().listarReseñasPorLugar(id_lugar);
    }
}
