
# EduLearn LMS - Learning Management System

A full-stack Learning Management System with Java Spring Boot backend and React frontend.

## Project Structure

- `/backend` - Spring Boot backend application with Java
- `/` - React frontend application

## Prerequisites

- Node.js 14+ and npm (for frontend)
- Java 17 (for backend)
- Maven 3.6+ (for building backend)
- MySQL Server 8.0+

## Backend Setup

1. **Configure MySQL**

   Create a MySQL database named `edu_lms`

   ```sql
   CREATE DATABASE edu_lms;
   ```

   You can change the database connection details in `backend/src/main/resources/application.properties` if needed.

2. **Build and Run Backend**

   Navigate to the backend directory and run:

   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`.

## Frontend Setup

1. **Install Dependencies**

   From the project root directory:

   ```bash
   npm install
   ```

2. **Update API Endpoint**

   Update the API base URL in the frontend to point to your backend server.

3. **Run Frontend**

   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`.

## Default Users

The system comes with two default users:

1. Admin Account:
   - Email: admin@lms.com
   - Password: password
   - Role: ADMIN

2. Student Account:
   - Email: student@lms.com
   - Password: password
   - Role: STUDENT

## Features

- User Authentication (Login/Register)
- Role-based Access Control (Admin and Student)
- Course Management
- Course Enrollment
- Progress Tracking
- User Management

## API Endpoints

### Authentication

- `POST /api/auth/signin` - Login
- `POST /api/auth/signup` - Register

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (Admin only)

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/{id}` - Update course (Admin only)
- `DELETE /api/courses/{id}` - Delete course (Admin only)
- `POST /api/courses/{id}/enroll` - Enroll in a course

### Enrollments

- `GET /api/enrollments/my` - Get current user's enrollments
- `GET /api/enrollments/user/{userId}` - Get user's enrollments (Admin only)
- `POST /api/enrollments/course/{courseId}` - Enroll in a course
- `PUT /api/enrollments/{id}/progress/{progress}` - Update enrollment progress
- `DELETE /api/enrollments/{id}` - Delete enrollment

## License

This project is licensed under the MIT License.
