
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CourseGrid from "@/components/courses/CourseGrid";
import { getCoursesWithEnrollmentStatus, mockCourses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Course } from "@/types";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    if (user) {
      const coursesWithStatus = getCoursesWithEnrollmentStatus(user.id);
      setCourses(coursesWithStatus);
    } else {
      setCourses(mockCourses);
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Courses</h1>
          <p className="text-muted-foreground">
            Explore our collection of Java and Spring Boot courses.
          </p>
        </div>

        <CourseGrid courses={courses} onCoursesUpdate={setCourses} />
      </div>
    </MainLayout>
  );
};

export default Courses;
