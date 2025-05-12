
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { getEnrolledCourses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Course } from "@/types";
import CourseGrid from "@/components/courses/CourseGrid";

const Enrollments = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      // In a real app, this would be an API call
      const courses = getEnrolledCourses(user.id);
      setEnrolledCourses(courses);
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Enrollments</h1>
          <p className="text-muted-foreground">
            Courses you're currently enrolled in.
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Enrolled Courses</h2>
            <p className="text-muted-foreground mb-6">
              You haven't enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <CourseGrid courses={enrolledCourses} />
        )}
      </div>
    </MainLayout>
  );
};

export default Enrollments;
