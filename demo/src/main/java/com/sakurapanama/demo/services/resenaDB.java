package com.sakurapanama.demo.services;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Resena;
import com.sakurapanama.demo.models.Usuario;
import com.sakurapanama.demo.models.Lugar;

import org.springframework.stereotype.Service;

@Service
public class ResenaDB implements resenaRep {
    private Connection connection;

    public ResenaDB() {
        connection = new Conexion().establecer_conexion();
        if (connection == null) {
            System.err.println("Error al establecer la conexión a la base de datos.");
        }
    }

    @Override
    public void insertarReseña(Resena reseña) {
        if (connection != null) {
            try {
               
                String query = "INSERT INTO resenas (puntuacion, comentario, imagen_url, username, id_lugar) VALUES (?, ?, ?, ?, ?)";
                PreparedStatement statement = connection.prepareStatement(query);
          
                statement.setInt(1, puntuacion);
                statement.setString(2, comentario);
                statement.setString(3, imagenUrl);
                statement.setString(4, username);
                statement.setInt(5, idLugar);

                int filasAfectadas = statement.executeUpdate();

                if (filasAfectadas > 0) {
                    System.out.println("Reseña insertada correctamente.");
                } else {
                    System.out.println("No se pudo insertar la reseña.");
                }
            } catch (SQLException e) {
                System.err.println("Error al insertar la reseña: " + e.getMessage());
            }
        } else {
            System.err.println("No se pudo establecer conexión con la base de datos.");
        }
    }

    @Override
    public void listarReseñasPorLugar(int idLugar) {
        if (connection != null) {
            try {
                String query = "SELECT * FROM resenas WHERE id_lugar = 3";
                PreparedStatement statement = connection.prepareStatement(query);
                statement.setInt(1, idLugar);

                ResultSet resultSet = statement.executeQuery();
                while (resultSet.next()) {
                    int puntuacion = resultSet.getInt("puntuacion");
                    String comentario = resultSet.getString("comentario");
                    String imagenUrl = resultSet.getString("imagen_url");
                    String username = resultSet.getString("username");
                }
               
                resultSet.close();
                statement.close();
            } catch (SQLException e) {
                System.err.println("Error al obtener las reseñas por lugar: " + e.getMessage());
            }
        } else {
            System.err.println("No se pudo establecer conexión con la base de datos.");
        }
    }

}


