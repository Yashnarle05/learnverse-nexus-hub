
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CourseDetail from "@/components/courses/CourseDetail";
import { mockCourses, getCoursesWithEnrollmentStatus } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Course } from "@/types";
import { Button } from "@/components/ui/button";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    // In a real app, this would be an API call
    setTimeout(() => {
      let foundCourse: Course | undefined;
      
      if (user) {
        const coursesWithStatus = getCoursesWithEnrollmentStatus(user.id);
        foundCourse = coursesWithStatus.find(c => c.id === courseId);
      } else {
        foundCourse = mockCourses.find(c => c.id === courseId);
      }

      if (foundCourse) {
        setCourse(foundCourse);
      }
      setLoading(false);
    }, 500);
  }, [courseId, user]);

  const handleEnroll = (courseId: string) => {
    if (course) {
      setCourse({ ...course, isEnrolled: true });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-lms-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/courses')}>
            Back to Courses
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-6xl py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          Back to Courses
        </Button>
        
        <CourseDetail course={course} onEnroll={handleEnroll} />
      </div>
    </MainLayout>
  );
};

export default CourseDetails;
