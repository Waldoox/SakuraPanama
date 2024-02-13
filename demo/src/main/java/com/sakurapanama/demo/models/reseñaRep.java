package com.sakurapanama.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sakurapanama.demo.services.Resena;

public interface reseñaRep extends JpaRepository<Resena, Integer> {
}