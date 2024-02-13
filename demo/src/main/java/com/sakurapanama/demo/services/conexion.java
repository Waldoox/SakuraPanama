package com.sakurapanama.demo.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sakurapanama.demo.models.reseñaRep;



@Service
public class conexion {
    @Autowired
    private reseñaRep resenaRepository;

    spring.datasource.url=jdbc:postgresql:// localhost:5432/tu_basededatos
    spring.datasource.username=tu_usuario;
    spring.datasource.password=tu_contraseña;
    spring.datasource.driver-class-name=org.postgresql.Driver;

    public void insertarResena(int puntuacion, String comentario, String imagenUrl, String username, int idLugar) {
        Resena resena = new Resena();
        resena.setPuntuacion(puntuacion);
        resena.setComentario(comentario);
        resena.setFecha(new Date());
        resena.setImagenUrl(imagenUrl);
        resena.setUsername(username);
        resena.setIdLugar(idLugar);
        resenaRepository.save(resena);
    }
}