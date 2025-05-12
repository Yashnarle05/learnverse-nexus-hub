
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-lms-primary to-lms-secondary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EduLearn LMS</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A complete learning management system for Java, Spring Boot and full-stack development courses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/courses">Browse Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
              <Link to="/register">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-lms-primary/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <BookOpen className="h-6 w-6 text-lms-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
              <p className="text-gray-600">Learn Java programming, Spring Boot, and full-stack development with our structured courses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-lms-secondary/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-lms-secondary">
                  <path d="M18 8v4l4 -4v12l-4 -4v4a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-16a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Lessons</h3>
              <p className="text-gray-600">Watch high-quality video tutorials and practice with interactive exercises.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-lms-accent/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-lms-accent">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Track your learning progress and get personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning with EduLearn LMS.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
