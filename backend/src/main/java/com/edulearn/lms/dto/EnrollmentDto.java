
package com.edulearn.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private String id;
    private String userId;
    private String courseId;
    private LocalDateTime enrollmentDate;
    private Integer progress;
    private String courseTitle;
    private String thumbnailUrl;
}
