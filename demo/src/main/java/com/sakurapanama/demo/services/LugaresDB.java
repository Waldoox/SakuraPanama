package com.sakurapanama.demo.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sakurapanama.demo.models.Lugar;

@Service
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
  }

  public List<Lugar> ObtenerRestaurantes() {
    try {
      Statement stmt = _cn.createStatement();
      String query = "SELECT * FROM lugar WHERE id_tipolocal = 1";

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
  }

  public List<Lugar> ObtenerTiendas() {
    try {
      Statement stmt = _cn.createStatement();
      String query = "SELECT * FROM lugar WHERE id_tipolocal = 2";

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
  }

  public List<Lugar> ObtenerVariedades() {
    try {
      Statement stmt = _cn.createStatement();
      String query = "SELECT * FROM lugar WHERE id_tipolocal = 3";

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
  }

  public boolean añadirLugar(Lugar lugar) {
        String query = "INSERT INTO lugar (nombre_lugar, direccion_lugar, descripcion, lugar_img, id_provincia, id_tipolocal) VALUES (?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement stmt = _cn.prepareStatement(query);
            stmt.setString(1, lugar.getNombre_lugar());
            stmt.setString(2, lugar.getDireccion_lugar());
            stmt.setString(3, lugar.getDescripcion());
            stmt.setString(4, lugar.getLugar_img());
            stmt.setInt(5, lugar.getId_provincia());
            stmt.setInt(6, lugar.getId_tipolocal());

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    public Lugar obtenerLugaresPorID(int id_lugar) {
      try {
          Statement stmt = _cn.createStatement();
          String query = "SELECT * FROM lugar WHERE id_lugar = " + id_lugar;
  
          ResultSet result = stmt.executeQuery(query);
          if (result.next()) {
              Lugar lugar = new Lugar(
                  result.getInt("id_lugar"),
                  result.getString("nombre_lugar"),
                  result.getString("direccion_lugar"),
                  result.getString("descripcion"),
                  result.getString("lugar_img"),
                  result.getInt("id_provincia"),
                  result.getInt("id_tipolocal")
              );
              result.close();
              stmt.close();
              return lugar;
          } else {
              return null;
          }
      } catch (Exception e) {
          e.printStackTrace(); 
          return null;
      }
  }
  
}
