package com.sakurapanama.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.sakurapanama.demo.jwt.JwtAuthFilter;
import com.sakurapanama.demo.models.Role;
import com.sakurapanama.demo.models.Usuario;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;
    private final UserDetails user;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        return http
            .csrf(csrf -> 
                csrf
                .disable())
            .authorizeHttpRequests(authRequest ->
              authRequest
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/img/**", "/css/**", "/js/**", "/*.html").permitAll()
                .requestMatchers("/registro", "/inicio", "/index", "/all","/tiendas","/variedades","/restaurantes", "/email/send",  "/busqueda").permitAll()
                .requestMatchers("/perfilAdmin", "/añadirLugar", "/dashboard").hasRole("ADMIN")
                .requestMatchers("/perfil").hasAuthority(user.getAuthorities().toString())
                )
            .sessionManagement(sessionManager->
                sessionManager 
                  .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
            
            
    }

}