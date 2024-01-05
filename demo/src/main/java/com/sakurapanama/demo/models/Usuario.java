package com.sakurapanama.demo.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario {

    private String username;
    private String fname;
    private String lname;
    private String password;
    private String eMail;
    private String phone;
    private Role rol;
}
