import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SocialLogin from "./SocialLogin";
import login1 from "../../Images/Login/login1.svg";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { authService } from "../../services/authService";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await authService.login(data);
      toast.success("Login Successful");
      reset();
      navigate(from, { replace: true });
    } catch (error: any) {
      // Handle Zod validation errors from server
      if (error.validationErrors) {
        error.validationErrors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    const email = getValues("email");
    if (email) {
      // You'll need to implement password reset on the server
      // and call it here.
      toast.success("Password reset instructions sent to your email.");
    } else {
      toast.error("Please enter your email address first");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
        <figure className="lg:w-1/2 hidden lg:flex">
          <img
            className="object-cover w-full h-full"
            src={login1}
            alt="Login illustration"
          />
        </figure>
        <div className="card-body lg:w-1/2 justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="opacity-70">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`input input-bordered w-full ${
                  errors.email ? 'input-error' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`input input-bordered w-full ${
                  errors.password ? 'input-error' : ''
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4 space-y-2 text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link className="link link-primary" to="/register">
                Create Account
              </Link>
            </p>
            <p>
              Forgot your password?{" "}
              <button className="link link-primary" onClick={resetPassword}>
                Reset Password
              </button>
            </p>
          </div>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;