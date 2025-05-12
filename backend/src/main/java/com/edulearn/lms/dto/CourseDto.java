
package com.edulearn.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String instructor;
    private String thumbnailUrl;
    private String duration;
    private Integer lessonCount;
    private Integer enrollmentCount;
    private Boolean isEnrolled;
}
