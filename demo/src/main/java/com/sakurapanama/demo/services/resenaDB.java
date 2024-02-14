package com.sakurapanama.demo.services;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Resena;
import com.sakurapanama.demo.models.Usuario;
import com.sakurapanama.demo.models.Lugar;

public class ResenaDB implements resenaRep {
    private Connection connection;

    public ResenaDB() {
        // Aquí deberías instanciar tu conexión a la base de datos, por ejemplo:
        // connection = new Conexion().establecer_conexion();
    }

    @Override
    public void insertarReseña(Resena reseña) {
        try {
            // Aquí debes implementar la lógica para insertar una reseña en la base de datos
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
    }

    @Override
    public List<Resena> listarReseñasPorLugar(int idLugar) {
        List<Resena> reseñas = new ArrayList<>();
        try {
            // Aquí debes implementar la lógica para obtener las reseñas de la base de datos
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejo de errores
        }
        return reseñas;
    }
}


/*public class ResenaDB {
    Connection _cn;

    public ResenaDB() {
        _cn = new conexion().establecer_conexion();
    }

    public void adicionar(String username){
        Resena resena = new Resena;
        String query = "Inser into reseña(puntuacion,comentario,imagenurl,username,id_lugar) values('"+getpuntuacion()+"','"+getcomentario()+"','"+getimagenurl()+"','"+setusername()+"','"+setid_lugar()+"')";
    }




    public Resena MostrarResult(String username){
        try{
            String query = "Select username,comentario,puntuacion,imagenurl from resena where id_lugar = 3";
            Statement stmt = _cn.createStatement();
            ResultSet result = stmt.executeQuery(query);

            if(result.next()){
                Resena resena = Resena.builder()
                .username(result.getString("username"))
                .comentario(result.getString("comentario"))
                .puntuacion(result.getInt("puntuacion"))
                .imagenurl(result.getString("imagenurl"))
                .build();

                result.close();
                stmt.close();
                return resena;

            }else{
                result.close();
                stmt.close();
                return null;

            }
        } catch(Exception e){
            int x = 1;
            return null;

        }

          

    }
}*/