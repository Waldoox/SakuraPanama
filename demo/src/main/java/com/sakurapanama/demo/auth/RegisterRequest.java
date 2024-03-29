package com.sakurapanama.demo.auth;

import com.sakurapanama.demo.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String nombreusr;
    private String apellidousr;
    private String password;
    private String correousr;
    private String telefonousr;
    private Role rol;
}
