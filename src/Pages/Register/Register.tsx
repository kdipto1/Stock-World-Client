import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import sign from "../../Images/Login/sign.svg";
import SocialLogin from "../Login/SocialLogin";
import LoadingSpinner from "../../components/LoadingSpinner";
import { authService } from "../../services/authService";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await authService.register({ 
        name: data.name, 
        email: data.email, 
        password: data.password 
      });
      toast.success("Registration Successful! Please login.");
      reset();
      navigate("/login");
    } catch (error: any) {
      // Handle Zod validation errors from server
      if (error.validationErrors) {
        error.validationErrors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
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
            src={sign}
            alt="Registration illustration"
          />
        </figure>
        <div className="card-body lg:w-1/2 justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <p className="opacity-70">Join StockWorld today!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className={`input input-bordered w-full ${
                  errors.name ? 'input-error' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
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
            
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className={`input input-bordered w-full ${
                  errors.confirmPassword ? 'input-error' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <p>
              Already have an account?{" "}
              <Link className="link link-primary" to="/login">
                Sign In
              </Link>
            </p>
          </div>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Register;