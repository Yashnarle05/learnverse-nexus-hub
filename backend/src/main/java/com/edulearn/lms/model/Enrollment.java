
package com.edulearn.lms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "enrollments")
public class Enrollment {
    
    @Id
    private String id;
    
    @DBRef
    private User user;
    
    @DBRef
    private Course course;
    
    private LocalDateTime enrollmentDate;
    
    private Integer progress = 0;
    
    // MongoDB doesn't have @PrePersist like JPA, so we will set this in the service
}
