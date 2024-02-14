package com.sakurapanama.demo.controllers;


import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.sakurapanama.demo.services.resenaRep;
import com.sakurapanama.demo.models.Resena;

@RestController
@RequestMapping("/reseñas")
public class ReseñaController {
    private final resenaRep reseñaService;

    public ReseñaController(resenaRep reseñaService) {
        this.reseñaService = reseñaService;
    }

    @PostMapping
    public void insertarReseña(@RequestBody Resena reseña) {
        resenaRep.insertarReseña(reseña);
    }

    @GetMapping("/{idLugar}")
    public List<Resena> listarReseñasPorLugar(@PathVariable int idLugar) {
        return reseñaService.listarReseñasPorLugar(idLugar);
    }
}