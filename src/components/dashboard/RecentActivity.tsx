
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivity = () => {
  const activities = [
    {
      action: "Completed lesson",
      course: "Java Programming",
      timestamp: "2 hours ago",
    },
    {
      action: "Enrolled in course",
      course: "Advanced Spring Boot",
      timestamp: "1 day ago",
    },
    {
      action: "Submitted assignment",
      course: "Database Design",
      timestamp: "3 days ago",
    },
    {
      action: "Started quiz",
      course: "Web Development",
      timestamp: "5 days ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="relative mt-1">
                <div className="h-2 w-2 rounded-full bg-lms-primary"></div>
                {index !== activities.length - 1 && (
                  <div className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-border"></div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {activity.action}: <span className="font-semibold text-lms-primary">{activity.course}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
