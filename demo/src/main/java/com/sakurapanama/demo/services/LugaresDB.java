package com.sakurapanama.demo.Services;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
  }

  public void AgregarLugar(Lugar nuevoLugar) {
        String query = "INSERT INTO lugar (nombre_lugar, direccion_lugar, descripcion, lugar_img, id_provincia, id_tipolocal) VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = _cn.prepareStatement(query)) {
            preparedStatement.setString(1, nuevoLugar.getNombre_lugar());
            preparedStatement.setString(2, nuevoLugar.getDireccion_lugar());
            preparedStatement.setString(3, nuevoLugar.getDescripcion());
            preparedStatement.setString(4, nuevoLugar.getLugar_img());
            preparedStatement.setInt(5, nuevoLugar.getId_provincia());
            preparedStatement.setInt(6, nuevoLugar.getId_tipolocal());

            int filasAfectadas = preparedStatement.executeUpdate();

            if (filasAfectadas > 0) {
                System.out.println("Inserción exitosa");
            } else {
                System.out.println("No se pudo insertar el lugar");
            }
        } catch (SQLException e) {
            e.printStackTrace();  // O manejo de la excepción
        }
    }

}
