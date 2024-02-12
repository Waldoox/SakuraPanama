package com.sakurapanama.demo;

import org.springframework.security.core.GrantedAuthority;

public class prueba {
    public static void main(String[] args) {
        mostrarAutoridades();
    }
    public static void mostrarAutoridades(){
        System.out.println(GrantedAuthority.class);
    }
}
