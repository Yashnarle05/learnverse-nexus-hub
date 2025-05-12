
package com.edulearn.lms.service;

import com.edulearn.lms.dto.AuthRequest;
import com.edulearn.lms.dto.JwtResponse;
import com.edulearn.lms.dto.LoginRequest;
import com.edulearn.lms.model.User;
import com.edulearn.lms.repository.UserRepository;
import com.edulearn.lms.security.JwtTokenProvider;
import com.edulearn.lms.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        return new JwtResponse(jwt, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
    
    public boolean registerUser(AuthRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return false;
        }
        
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());
        
        userRepository.save(user);
        return true;
    }
}
