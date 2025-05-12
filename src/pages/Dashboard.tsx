
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import EnrollmentStatus from "@/components/dashboard/EnrollmentStatus";
import { getEnrolledCourses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, User, Users } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const isAdmin = user?.role === "admin";

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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isAdmin ? (
            <>
              <StatCard 
                title="Total Students" 
                value="120" 
                icon={<Users className="h-6 w-6 text-lms-primary" />} 
                description="+12% from last month" 
              />
              <StatCard 
                title="Active Courses" 
                value="24" 
                icon={<BookOpen className="h-6 w-6 text-lms-primary" />} 
                description="4 new courses this month" 
              />
              <StatCard 
                title="Course Completions" 
                value="48" 
                icon={<User className="h-6 w-6 text-lms-primary" />} 
                description="+8% from last month" 
              />
            </>
          ) : (
            <>
              <StatCard 
                title="Enrolled Courses" 
                value={enrolledCourses.length} 
                icon={<BookOpen className="h-6 w-6 text-lms-primary" />} 
              />
              <StatCard 
                title="Completed Lessons" 
                value="18" 
                icon={<User className="h-6 w-6 text-lms-primary" />} 
              />
              <StatCard 
                title="Average Progress" 
                value="45%" 
                icon={<Users className="h-6 w-6 text-lms-primary" />} 
              />
            </>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            {!isAdmin && <EnrollmentStatus />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
