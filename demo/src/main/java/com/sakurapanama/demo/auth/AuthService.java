package com.sakurapanama.demo.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sakurapanama.demo.jwt.JwtService;
import com.sakurapanama.demo.models.Usuario;
import com.sakurapanama.demo.Services.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepo.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder() 
            .username(request.getUsername())
            .nombreusr(request.getNombreusr())
            .apellidousr (request.getApellidousr())
            .password(passwordEncoder.encode(request.getPassword()))
            .correousr(request.getCorreousr())
            .telefonousr(request.getTelefonousr())
            .rol(request.getRol())
            .build();

        userRepo.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
    }

}
