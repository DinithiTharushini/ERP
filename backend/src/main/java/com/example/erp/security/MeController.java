package com.example.erp.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MeController {
    @GetMapping("/me")
    public Object me(Authentication auth) {
        return new MeResponse(auth.getName(), auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
    }

    public record MeResponse(String username, List<String> roles) {}
}


