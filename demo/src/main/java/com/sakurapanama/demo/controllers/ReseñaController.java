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
    public Resena insertarReseña(@RequestParam("imageFile") MultipartFile imageFile, @RequestBody Review review) {
        if (!imageFile.isEmpty()) {
            try {
                byte[] imageBytes = imageFile.getBytes();
                byte[] processedImageBytes = processImage(imageBytes);
                String imageUrl = imageService.saveImage(processedImageBytes);
                review.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return reviewService.insertarReseña(Resena);

    }


    @GetMapping("/{idLugar}")
    public List<Resena> listarReseñasPorLugar(@PathVariable int idLugar) {
        return reseñaService.listarReseñasPorLugar(idLugar);
    }
}