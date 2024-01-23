package com.sakurapanama.demo.Services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sakurapanama.demo.models.Usuario;

import java.util.Optional;


public interface UserRepo extends JpaRepository<Usuario,String> {
    Optional<Usuario> findByUsername(String username);
}
