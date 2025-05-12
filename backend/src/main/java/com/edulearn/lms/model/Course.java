
package com.edulearn.lms.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "courses")
public class Course {
    
    @Id
    private String id;
    
    @NotBlank
    @Size(max = 100)
    private String title;
    
    @Size(max = 500)
    private String description;
    
    @NotBlank
    private String instructor;
    
    private String thumbnailUrl;
    
    private String duration;
    
    private Integer lessonCount;
    
    @DBRef(lazy = true)
    private List<Enrollment> enrollments = new ArrayList<>();
    
    public Integer getEnrollmentCount() {
        return enrollments != null ? enrollments.size() : 0;
    }
}
