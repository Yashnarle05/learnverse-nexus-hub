
package com.edulearn.lms.controller;

import com.edulearn.lms.dto.AuthRequest;
import com.edulearn.lms.dto.JwtResponse;
import com.edulearn.lms.dto.LoginRequest;
import com.edulearn.lms.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwt = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody AuthRequest signUpRequest) {
        if (authService.registerUser(signUpRequest)) {
            return ResponseEntity.ok().body("User registered successfully!");
        } else {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
    }
}
