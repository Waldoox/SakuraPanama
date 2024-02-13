package com.sakurapanama.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

// Importa la clase Resena correcta desde el paquete models
import com.sakurapanama.demo.services.*;

// Cambia el nombre de la interfaz a ResenaRepository
public interface reseñaRep extends JpaRepository<resena, Integer> {
}