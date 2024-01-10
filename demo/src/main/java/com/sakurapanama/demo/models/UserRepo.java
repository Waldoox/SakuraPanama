package com.sakurapanama.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepo extends JpaRepository<Usuario,String> {
    Optional<Usuario> findByUsername(String username);
}
