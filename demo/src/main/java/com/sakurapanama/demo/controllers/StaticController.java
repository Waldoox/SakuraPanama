package com.sakurapanama.demo.controllers;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;



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
}
