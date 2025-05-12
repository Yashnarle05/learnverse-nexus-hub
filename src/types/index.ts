
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  enrollmentCount: number;
  lessons: number;
  isEnrolled?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  progress: number;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'student';
}
