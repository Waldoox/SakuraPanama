package com.sakurapanama.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("sakurapanamareviews@gmail.com");
        message.setTo("kbarria903@gmail.com");
        message.setSubject("Restablece tu contraseña");
        message.setText("Este es el mensaje de restablecimiento");

        javaMailSender.send(message);
    }
}
