
package com.edulearn.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.edulearn.lms.model.User.Role;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String name;
    private String email;
    private Role role;
    
    public JwtResponse(String token, String id, String name, String email, Role role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
