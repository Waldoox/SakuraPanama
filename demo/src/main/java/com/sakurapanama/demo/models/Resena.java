package com.sakurapanama.demo.models;


import java.sql.Date;
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
public class Resena {
    @Id
    @GeneratedValue
    private int id_resena;
    private int puntuación;
    private String comentario;
    private Date fecha;
    private String imagenurl;
    private String username;
    private int id_lugar;

}