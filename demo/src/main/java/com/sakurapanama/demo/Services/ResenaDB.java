package com.sakurapanama.demo.Services;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Resena;
import org.springframework.stereotype.Service;

@Service
public class ResenaDB{
    Connection _cn;

    public ResenaDB() {
    _cn = new Conexion().openDb();
    }

    public boolean añadirResena(Resena resena) {
        String query = "INSERT INTO reseña (puntuación, comentario, fecha, imagenurl, username, id_lugar) VALUES (?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement stmt = _cn.prepareStatement(query);
            stmt.setInt(1, resena.getPuntuación());
            stmt.setString(2, resena.getComentario());
            stmt.setDate(3, resena.getFecha());
            stmt.setString(4, resena.getImagenurl());
            stmt.setString(5, resena.getUsername());
            stmt.setInt(6, resena.getId_lugar());

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Resena> listarReseñasPorLugar(int idLugar) {
        if (_cn != null) {
            try {
                String query = "SELECT * FROM reseña WHERE id_lugar = ?";
                PreparedStatement statement = _cn.prepareStatement(query);
                statement.setInt(1, idLugar);
                ResultSet resultSet = statement.executeQuery();
    
                List<Resena> resenas = new ArrayList<>();
                while (resultSet.next()) {
                    Resena resena = new Resena(
                        resultSet.getInt("id_reseña"),
                        resultSet.getInt("puntuación"),
                        resultSet.getString("comentario"),  
                        resultSet.getDate("fecha"),
                        resultSet.getString("imagenurl"),
                        resultSet.getString("username"),
                        resultSet.getInt("id_lugar"));
                    resenas.add(resena);
                }
    
                resultSet.close();
                statement.close();
                return resenas;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        } else {
            System.err.println("No se pudo establecer conexión con la base de datos.");
            return null;
        }
    }

    public List<Resena> listarReseñasPorUsuario(String username) {
        if (_cn != null) {
            try {
                String query = "SELECT * FROM reseña WHERE username = ?";
                PreparedStatement statement = _cn.prepareStatement(query);
                statement.setString(1, username);
                ResultSet resultSet = statement.executeQuery();
    
                List<Resena> resenas = new ArrayList<>();
                while (resultSet.next()) {
                    Resena resena = new Resena(
                        resultSet.getInt("id_reseña"),
                        resultSet.getInt("puntuación"),
                        resultSet.getString("comentario"),
                        resultSet.getDate("fecha"),
                        resultSet.getString("imagenurl"),
                        resultSet.getString("username"),
                        resultSet.getInt("id_lugar"));
                    resenas.add(resena);
                }
    
                resultSet.close();
                statement.close();
                return resenas;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        } else {
            System.err.println("No se pudo establecer conexión con la base de datos.");
            return null;
        }
    }
}


