package com.sakurapanama.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.sakurapanama.demo.Services.LugaresDB;
import com.sakurapanama.demo.models.Lugar;



@Controller
public class StaticController {

    @GetMapping("/registro")
    public String registro() {
        return "registro.html";
    }
    
    @GetMapping("/inicio")
    public String inicioSesion(){
        return "inicio.html";
    }
    
    @GetMapping("/index")
    public String index(){
        return "index.html";
    }

    @GetMapping("/perfilAdmin")
    public String perfilAdmin(){
        return "perfilAdmin.html";
    }

    @GetMapping("/dashboard")
    public String dashboard(){
        return "dashboard.html";
    }


    @GetMapping("/busqueda")
    public String busqueda(){
        return "busqueda.html";
    }
    @GetMapping("/perfil")
    public String perfilUsuario(){
        return "perfilUsuario.html";
    }

    
    @GetMapping("/detalle_local")
public String mostrarDetalleLocal(@RequestParam("id") int id_lugar) {
    // Tu lógica para mostrar el detalle del lugar
    return "detalle_local.html"; 
}

    @GetMapping("/aboutUs")
    public String aboutUs() {
        return "about_us.html"; 
    }
    
    
    }

