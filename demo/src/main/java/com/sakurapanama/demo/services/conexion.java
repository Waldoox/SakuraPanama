package com.sakurapanama.demo.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class conexion {
 public Connection openDb() {
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection("jdbc:postgresql://monorail.proxy.rlwy.net:25736/Sakura", "postgres", "14FDAgB*BaCADCDb*6*3ffgf4A2f4-ff");
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
}