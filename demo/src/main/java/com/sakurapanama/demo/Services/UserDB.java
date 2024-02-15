package com.sakurapanama.demo.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.sakurapanama.demo.models.Role;
import com.sakurapanama.demo.models.Usuario;

public class UserDB {
    Connection _cn;

    public UserDB() {
        _cn = new Conexion().openDb();
    }

    public Usuario ObtenerPerfil(String username) {
    try {
        String query = "SELECT username, correousr,  rol, perfilimg FROM Usuario WHERE username = ?";
        PreparedStatement pstmt = _cn.prepareStatement(query);
        pstmt.setString(1, username);

        ResultSet result = pstmt.executeQuery();

        if (result.next()) {
            Usuario usuario = Usuario.builder()
                .username(result.getString("username"))
                .correousr(result.getString("correousr"))
                .rol(Role.valueOf(result.getString("rol")))
                .perfilimg(result.getString("perfilimg"))
                .build();

            result.close();
            pstmt.close();
            return usuario;
        } else {
            result.close();
            pstmt.close();
            return null;
        }
    } catch (Exception e) {
        // Manejo de excepciones
        int x = 1;
        return null;
    }
}
    
}
