
import RegisterForm from "@/components/auth/RegisterForm";
import MainLayout from "@/components/layout/MainLayout";

const Register = () => {
  return (
    <MainLayout requireAuth={false}>
      <div className="container mx-auto max-w-6xl py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-8 text-3xl font-bold">Create an Account</h1>
          <RegisterForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
