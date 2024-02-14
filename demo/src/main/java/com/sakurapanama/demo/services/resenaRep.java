package com.sakurapanama.demo.services;

import com.sakurapanama.demo.models.Resena;

import java.util.List;

public interface resenaRep {
    void insertarReseña(Resena reseña);
    List<Resena> listarReseñasPorLugar(int idLugar);
}