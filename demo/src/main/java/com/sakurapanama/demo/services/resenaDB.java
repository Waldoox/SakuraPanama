package com.sakurapanama.demo.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sakurapanama.demo.services.Resena;
import com.sakurapanama.demo.models.reseñaRep;


@Service
public class resenaDB {
    
    @Autowired
    private reseñaRep resenaRepository;

    @Autowired
    private conexion conexion;

    public void insertarResena(int puntuacion, String comentario, String imagenUrl, String username, int idLugar) {
        try (Connection connection = conexion.openDb()) {
            String sql = "INSERT INTO resena (puntuacion, comentario, fecha, imagenurl, username, id_lugar) VALUES (?, ?, ?, ?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, puntuacion);
                statement.setString(2, comentario);
                statement.setDate(3, new java.sql.Date(new Date().getTime())); // Se convierte la fecha de Java a SQL
                statement.setString(4, imagenUrl);
                statement.setString(5, username);
                statement.setInt(6, idLugar);
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    
}
