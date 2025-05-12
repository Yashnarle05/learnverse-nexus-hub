
package com.edulearn.lms.service;

import com.edulearn.lms.dto.EnrollmentDto;
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
public class EnrollmentService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    public List<EnrollmentDto> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<EnrollmentDto> getEnrollment(Long id) {
        return enrollmentRepository.findById(id).map(this::convertToDto);
    }
    
    public EnrollmentDto createEnrollment(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        // Check if already enrolled
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserAndCourse(user, course);
        if (existingEnrollment.isPresent()) {
            return convertToDto(existingEnrollment.get());
        }
        
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0);
        
        return convertToDto(enrollmentRepository.save(enrollment));
    }
    
    public Optional<EnrollmentDto> updateProgress(Long id, Integer progress) {
        return enrollmentRepository.findById(id).map(enrollment -> {
            enrollment.setProgress(progress);
            return convertToDto(enrollmentRepository.save(enrollment));
        });
    }
    
    public boolean deleteEnrollment(Long id) {
        if (enrollmentRepository.existsById(id)) {
            enrollmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private EnrollmentDto convertToDto(Enrollment enrollment) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(enrollment.getId());
        dto.setUserId(enrollment.getUser().getId());
        dto.setCourseId(enrollment.getCourse().getId());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
        dto.setProgress(enrollment.getProgress());
        dto.setCourseTitle(enrollment.getCourse().getTitle());
        dto.setThumbnailUrl(enrollment.getCourse().getThumbnailUrl());
        return dto;
    }
}
