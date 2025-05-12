
import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface CourseDetailProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

const CourseDetail = ({ course, onEnroll }: CourseDetailProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(course.isEnrolled || false);
  const isAdmin = user?.role === "admin";

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in this course",
        variant: "destructive",
      });
      return;
    }

    if (onEnroll) {
      onEnroll(course.id);
    }
    
    setIsEnrolled(true);
    toast({
      title: "Enrolled successfully",
      description: "You have been enrolled in the course",
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative h-48 overflow-hidden rounded-lg md:h-64 lg:h-80">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-lg text-muted-foreground">by {course.instructor}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Course Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">What You'll Learn</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Understand key Java programming concepts</li>
              <li>Build robust backend applications with Spring Boot</li>
              <li>Design efficient database schemas</li>
              <li>Implement security best practices</li>
              <li>Deploy applications to production environments</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{course.enrollmentCount} students enrolled</span>
              </div>

              {isEnrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Your progress</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} />
                </div>
              )}

              {isAdmin ? (
                <Button className="w-full" variant="outline">
                  Edit Course
                </Button>
              ) : isEnrolled ? (
                <Button className="w-full">Continue Learning</Button>
              ) : (
                <Button onClick={handleEnroll} className="w-full">
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
