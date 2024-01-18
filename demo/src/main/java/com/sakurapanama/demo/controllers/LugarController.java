package com.sakurapanama.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LugarController {

    @GetMapping("/lugar/all")
    public List<LugarController> ObtenerTodosLugar(){
        return null;

    }
    
}
