
import LoginForm from "../components/auth/LoginForm";
import MainLayout from "../components/layout/MainLayout";

const Login = () => {
  return (
    <MainLayout requireAuth={false}>
      <div className="container mx-auto max-w-6xl py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-8 text-3xl font-bold">Login</h1>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
