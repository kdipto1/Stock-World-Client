import React, { useEffect, useRef } from "react";
import SocialLogin from "./SocialLogin";
import login1 from "../../Images/Login/login1.svg";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [user1, loading1] = useAuthState(auth);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user || user1) {
      toast.success("Login Successful");
      const email = user?.user?.email || user1?.email;
      axios
        .post("https://stock-world-server.onrender.com/login", { email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("email", email as string);
          navigate(from, { replace: true });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    if (error) {
      toast.error(error.message);
    }
  }, [error, from, navigate, user, user1]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    signInWithEmailAndPassword(email, password);
  };

  const resetPassword = async () => {
    const email = emailRef.current?.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast.success("Sent password reset email");
    } else {
      toast.error("Please enter your email address");
    }
  };

  if (loading || loading1 || sending) {
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

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              ref={emailRef}
              placeholder="Email"
              required
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 space-y-2 text-sm">
            <p>
              Don't have an account?{" "}
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