package com.sakurapanama.demo.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.sakurapanama.demo.models.Lugar;


public class LugaresDB {
  Connection _cn;

  public LugaresDB() {
    _cn = new Conexion().openDb();
  }

  public List<Lugar> ObtenerLugares() {
    try {
      Statement stmt = _cn.createStatement();
      String query = "SELECT * FROM lugar";

      List<Lugar> lugares = new ArrayList<>();
      ResultSet result = stmt.executeQuery(query);
      while (result.next()) {
        Lugar producto = new Lugar(
            result.getInt("id_lugar"),
            result.getString("nombre_lugar"),
            result.getString("direccion_lugar"),
            result.getString("descripcion"),
            result.getString("lugar_img"),
            result.getInt("id_provincia"),
            result.getInt("id_tipolocal"));

        lugares.add(producto);
      }

      result.close();
      stmt.close();
      return lugares;

    } catch (Exception e) {
      int x = 1;
    }
    return null;
  }}
