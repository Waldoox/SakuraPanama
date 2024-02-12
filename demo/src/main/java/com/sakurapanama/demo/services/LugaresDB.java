package com.sakurapanama.demo.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
  
  public class FiltroRestuarante {
  
    public List<Lugar> filtrarLugares(boolean restaurante, boolean variedades, boolean eventos) {
      StringBuilder sql = new StringBuilder("SELECT * FROM lugares WHERE 1=1");

      if (restaurante) {
        sql.append("tipo = resturante");
        if(variedades || eventos){
          sql.append("OR");
        }
      }

      if(variedades){
        sql.append("tipo = variedades");
        if (eventos) {
          sql.append("OR");
        }
      }

      if (eventos) {
      sql.append("tipo = eventos");
      }
    
      // Ejecutar la consulta SQL y mapear los resultados a objetos Lugar
      List<Lugar> lugares =  new ArrayList<>();
      while (rs.next) {
        
      }

      //ver como hacer la conexion 
      
    
      return lugares;
    }
    
  }
}
  