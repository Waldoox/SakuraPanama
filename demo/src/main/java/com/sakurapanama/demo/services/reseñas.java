package com.sakurapanama.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResenaService {
    private final ResenaRepository resenaRepository;

    @Autowired
    public ResenaService(ResenaRepository resenaRepository) {
        this.resenaRepository = resenaRepository;
    }

    public List<Resena> obtenerTodasLasResenas() {
        return resenaRepository.findAll();
    }

    public Resena guardarResena(Resena resena) {
        return resenaRepository.save(resena);
    }

    public void eliminarResena(Long idResena) {
        resenaRepository.deleteById(idResena);
    }
}