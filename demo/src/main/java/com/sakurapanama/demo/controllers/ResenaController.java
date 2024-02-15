package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sakurapanama.demo.Services.ResenaDB;
import com.sakurapanama.demo.models.Resena;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ResenaController {

    private final ResenaDB resenaDB = new ResenaDB();

    @PostMapping("/addReview")
    public ResponseEntity<String> añadirResena(@RequestBody Resena resena) {
        boolean insercionExitosa = resenaDB.añadirResena(resena);
        if (insercionExitosa) {
            return ResponseEntity.ok("El local ha sido añadido correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error al añadir el local. Por favor, inténtelo de nuevo más tarde.");
        }
    }

    @GetMapping("/obtenerResenas/{id_lugar}")
    public List<Resena> ObtenerResenas(@PathVariable int id_lugar) {
    return new ResenaDB().listarReseñasPorLugar(id_lugar);
    }

    @GetMapping("/ResenasPorUsuario/{username}")
    public List<Resena> obtenerResenasPorUsuario(@PathVariable String username) {
        return new ResenaDB().listarReseñasPorUsuario(username);
    }

}
