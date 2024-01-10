package com.sakurapanama.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Usuario,String> {
    
}
