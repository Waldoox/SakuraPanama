package com.sakurapanama.demo.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Lugar;

public class LugarDb {
    Connection _cn;

    public LugarDb(){
        _cn = new Conexion().openDb();
    }
    public List<Lugar> ObtenerLugar(){
        try {
           Statement stmt = _cn.createStatement();
           String query = "SELECT * FROM lugar";

            List<Lugar> lugars = new ArrayList<>();
            ResultSet result = stmt.executeQuery(query);
            while (result.next()) {
                Lugar lugar = new  Lugar(
                    result.getString("lugar_img")
                );

                lugars.add(lugar);
            }

            result.close();
            stmt.close();
           return lugars;

        } catch (Exception e) {
           int x = 1;
        }
        return null;

    }
}
