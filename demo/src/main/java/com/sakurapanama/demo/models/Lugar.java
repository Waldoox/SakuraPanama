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
public class Lugar {
    @Id
    @GeneratedValue
   private int id_lugar;
   private String nombre_lugar;
   private String direccion_lugar;
   private String descripcion;
   private String lugar_img;
   private int id_provincia;
   private int id_tipolocal;

}
