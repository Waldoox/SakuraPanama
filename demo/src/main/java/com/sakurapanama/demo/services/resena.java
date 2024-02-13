package com.sakurapanama.demo.services;

import javax.persistence.*;
import java.util.*;

@Entity
public class Resena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int puntuacion;
    private String comentario;
    private Date fecha;
    private String imagenUrl;
    private String username;
    private int idLugar;

    /**
     * Constructor vacío necesario para JPA.
     */
    public Resena() {
    }

    public Resena(int puntuacion, String comentario, String imagenUrl, String username, int idLugar) {
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha = new Date();
        this.imagenUrl = imagenUrl;
        this.username = username;
        this.idLugar = idLugar;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getIdLugar() {
        return idLugar;
    }

    
    public void setIdLugar(int idLugar) {
        this.idLugar = idLugar;
    }
}