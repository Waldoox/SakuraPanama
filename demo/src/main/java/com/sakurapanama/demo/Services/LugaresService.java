package com.sakurapanama.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sakurapanama.demo.models.Lugar;
import com.sakurapanama.demo.repository.LugarRepository;

@Service
public class LugaresService {

    @Autowired
    private LugarRepository lugarRepository;

    public List<Lugar> obtenerLugares() {
        return lugarRepository.findAll();
    }
}
