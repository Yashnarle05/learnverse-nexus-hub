
import { useState } from "react";
import { Course } from "@/types";
import CourseCard from "./CourseCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { mockEnrollments } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

interface CourseGridProps {
  courses: Course[];
  onCoursesUpdate?: (updatedCourses: Course[]) => void;
}

const CourseGrid = ({ courses, onCoursesUpdate }: CourseGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in courses",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API
    // Here we'll just update our local state
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return { ...course, isEnrolled: true };
      }
      return course;
    });

    if (onCoursesUpdate) {
      onCoursesUpdate(updatedCourses);
    }

    toast({
      title: "Enrolled successfully",
      description: "You have been enrolled in the course",
    });
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
      
      {filteredCourses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No courses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
