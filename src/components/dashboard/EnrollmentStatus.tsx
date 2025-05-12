
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const EnrollmentStatus = () => {
  const enrollments = [
    {
      course: "Introduction to Java Programming",
      progress: 65,
    },
    {
      course: "Full Stack Web Development",
      progress: 25,
    },
    {
      course: "Database Design with MySQL",
      progress: 10,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {enrollments.map((enrollment, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{enrollment.course}</span>
                <span className="text-sm text-muted-foreground">{enrollment.progress}%</span>
              </div>
              <Progress value={enrollment.progress} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentStatus;
