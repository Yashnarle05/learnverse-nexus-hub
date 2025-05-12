
import { Course, Enrollment, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@lms.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Student User",
    email: "student@lms.com",
    role: "student",
  },
];

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Java Programming",
    description: "Learn the fundamentals of Java programming language.",
    instructor: "John Doe",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=500",
    duration: "8 weeks",
    enrollmentCount: 120,
    lessons: 12,
  },
  {
    id: "2",
    title: "Advanced Spring Boot",
    description: "Master Spring Boot for building enterprise applications.",
    instructor: "Jane Smith",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=500",
    duration: "10 weeks",
    enrollmentCount: 85,
    lessons: 15,
  },
  {
    id: "3",
    title: "Full Stack Web Development",
    description: "Build end-to-end applications with React and Spring Boot.",
    instructor: "Alex Johnson",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=500",
    duration: "12 weeks",
    enrollmentCount: 150,
    lessons: 20,
  },
  {
    id: "4",
    title: "Database Design with MySQL",
    description: "Learn how to design and optimize databases using MySQL.",
    instructor: "Sarah Lee",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&w=500",
    duration: "6 weeks",
    enrollmentCount: 95,
    lessons: 10,
  },
];

export const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    userId: "2",
    courseId: "1",
    enrollmentDate: "2025-04-15",
    progress: 35,
  },
  {
    id: "2",
    userId: "2",
    courseId: "3",
    enrollmentDate: "2025-05-02",
    progress: 10,
  },
];

// Helper function to get enrolled courses for a user
export const getEnrolledCourses = (userId: string): Course[] => {
  const userEnrollments = mockEnrollments.filter(e => e.userId === userId);
  return mockCourses
    .filter(course => userEnrollments.some(e => e.courseId === course.id))
    .map(course => ({
      ...course,
      isEnrolled: true,
    }));
};

// Helper function to get all courses with enrollment status
export const getCoursesWithEnrollmentStatus = (userId: string): Course[] => {
  const userEnrollments = mockEnrollments.filter(e => e.userId === userId);
  return mockCourses.map(course => ({
    ...course,
    isEnrolled: userEnrollments.some(e => e.courseId === course.id),
  }));
};
