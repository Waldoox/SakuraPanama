package com.sakurapanama.demo.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Articulo;

//Esta clase es para las consultas a la base de datos, cada metodo puede ser una consulta diferente

public class ArticulosDB {
    Connection _cn;

    public ArticulosDB() {
        _cn = new Conexion().openDb();
    }

    public List<Articulo> obtenerArticulos() {
        try {
            Statement stmt = _cn.createStatement();
            String query = "SELECT * FROM articulo";  // Ajusta el nombre de la tabla según tu base de datos

            List<Articulo> articulos = new ArrayList<>();
            ResultSet result = stmt.executeQuery(query);
            while (result.next()) {
                Articulo articulo = new Articulo(
                    result.getInt("id_artículo"),
                    result.getString("nombre"),
                    result.getString("descripción"),
                    result.getDouble("precio")
                );

                articulos.add(articulo);
            }

            result.close();
            stmt.close();
            return articulos;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
