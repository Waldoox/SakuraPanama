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

    @GetMapping("/prueba")
    public String prueba(){
        return "prueba.html";
    }

}
