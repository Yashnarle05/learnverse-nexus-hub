
import { Course } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

const CourseCard = ({ course, onEnroll }: CourseCardProps) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-semibold">{course.title}</h3>
          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-gray-600 h-10">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.enrollmentCount} students</span>
          </div>
          <div className="text-muted-foreground">{course.duration}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isAdmin ? (
          <Link to={`/courses/${course.id}`} className="w-full">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
        ) : course.isEnrolled ? (
          <Link to={`/courses/${course.id}`} className="w-full">
            <Button className="w-full">Continue Learning</Button>
          </Link>
        ) : (
          <Button 
            onClick={() => onEnroll?.(course.id)}
            className="w-full"
          >
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
