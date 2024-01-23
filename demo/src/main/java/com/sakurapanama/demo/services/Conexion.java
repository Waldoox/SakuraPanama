package com.sakurapanama.demo.services;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
  public Connection openDb() {
    try {
      Class.forName("org.postgresql.Driver");
      return DriverManager.getConnection("jdbc:postgresql://monorail.proxy.rlwy.net:25736/railway","postgres","14FDAgB*BaCADCDb*6*3ffgf4A2f4-ff");
    } catch (SQLException e) {
      int x = 1;
    } catch (ClassNotFoundException cnfex) {
      int x = 1;
    }
    return null;
  }
}