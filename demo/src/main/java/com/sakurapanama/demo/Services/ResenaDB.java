package com.sakurapanama.demo.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import com.sakurapanama.demo.models.Resena;

public class ResenaDB {

    Connection _cn;

    public ResenaDB() {
    _cn = new Conexion().openDb();
    }


    public boolean añadirReseña(Resena resena) {
        String query = "INSERT INTO lugar (nombre_lugar, direccion_lugar, descripcion, lugar_img, id_provincia, id_tipolocal) VALUES (?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement stmt = _cn.prepareStatement(query);
            stmt.setInt(1, resena.getPuntuacion());
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









   /*String query = "SELECT * FROM resenas WHERE id_lugar = 3";
PreparedStatement statement = connection.prepareStatement(query);
statement.setInt(1, idLugar); */ 
}
