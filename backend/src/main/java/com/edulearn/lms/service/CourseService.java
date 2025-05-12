
package com.edulearn.lms.service;

import com.edulearn.lms.dto.CourseDto;
import com.edulearn.lms.model.Course;
import com.edulearn.lms.model.Enrollment;
import com.edulearn.lms.model.User;
import com.edulearn.lms.repository.CourseRepository;
import com.edulearn.lms.repository.EnrollmentRepository;
import com.edulearn.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    public List<CourseDto> getAllCourses(Long userId) {
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;
        
        return courseRepository.findAll().stream()
                .map(course -> convertToDto(course, user))
                .collect(Collectors.toList());
    }
    
    public Optional<CourseDto> getCourseById(Long id, Long userId) {
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;
        
        return courseRepository.findById(id)
                .map(course -> convertToDto(course, user));
    }
    
    public CourseDto createCourse(Course course) {
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse, null);
    }
    
    public Optional<CourseDto> updateCourse(Long id, Course courseDetails) {
        return courseRepository.findById(id).map(course -> {
            course.setTitle(courseDetails.getTitle());
            course.setDescription(courseDetails.getDescription());
            course.setInstructor(courseDetails.getInstructor());
            course.setThumbnailUrl(courseDetails.getThumbnailUrl());
            course.setDuration(courseDetails.getDuration());
            course.setLessonCount(courseDetails.getLessonCount());
            return convertToDto(courseRepository.save(course), null);
        });
    }
    
    public boolean deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public boolean enrollUserInCourse(Long userId, Long courseId) {
        User user = userRepository.findById(userId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        
        if (user == null || course == null) {
            return false;
        }
        
        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            return false;
        }
        
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0);
        
        enrollmentRepository.save(enrollment);
        return true;
    }
    
    private CourseDto convertToDto(Course course, User user) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setInstructor(course.getInstructor());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setDuration(course.getDuration());
        dto.setLessonCount(course.getLessonCount());
        dto.setEnrollmentCount(course.getEnrollmentCount());
        
        // Check if the user is enrolled in this course
        if (user != null) {
            dto.setIsEnrolled(enrollmentRepository.existsByUserAndCourse(user, course));
        } else {
            dto.setIsEnrolled(false);
        }
        
        return dto;
    }
}
