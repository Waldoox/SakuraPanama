package com.sakurapanama.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sakurapanama.demo.models.Lugar;

public interface LugarRepository extends JpaRepository<Lugar, Integer> {
    // Puedes agregar métodos de consulta personalizados aquí si es necesario
}
