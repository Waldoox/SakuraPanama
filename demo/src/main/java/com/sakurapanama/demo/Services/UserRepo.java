package com.sakurapanama.demo.Services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sakurapanama.demo.models.Usuario;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Usuario,String> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByCorreousr(String correousr);
}
