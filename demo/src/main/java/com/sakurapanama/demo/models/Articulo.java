package com.sakurapanama.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Articulo {
    //Esta es el modelo de la tabla, aqui pones los datos de la tabla de la BD
    @Id
    @GeneratedValue
   private int id_artículo;
   private String nombre;
   private String descripción;
   private double precio;
}
