
package com.edulearn.lms.controller;

import com.edulearn.lms.dto.EnrollmentDto;
import com.edulearn.lms.security.UserDetailsImpl;
import com.edulearn.lms.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<EnrollmentDto>> getMyEnrollments(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(enrollmentService.getUserEnrollments(userDetails.getId()));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EnrollmentDto>> getUserEnrollments(@PathVariable Long userId) {
        return ResponseEntity.ok(enrollmentService.getUserEnrollments(userId));
    }

    @PostMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentDto> enrollInCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        EnrollmentDto enrollment = enrollmentService.createEnrollment(userDetails.getId(), courseId);
        return ResponseEntity.ok(enrollment);
    }

    @PutMapping("/{id}/progress/{progress}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentDto> updateProgress(
            @PathVariable Long id,
            @PathVariable Integer progress,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return enrollmentService.updateProgress(id, progress)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long id) {
        if (enrollmentService.deleteEnrollment(id)) {
            return ResponseEntity.ok().body("Enrollment deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
