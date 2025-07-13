// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from "react";
import SocialLogin from "./SocialLogin";
import login1 from "../../Images/Login/login1.svg";
import toast from "react-hot-toast";
import { sendEmailVerification } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAuthState,
  // useSendEmailVerification,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  // const [sendEmailVerification, verifySending, verifyError] =
  //   useSendEmailVerification(auth);
  const [user1, loading1] = useAuthState(auth);
  const emailRef = useRef("");
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (loading || loading1) {
      return;
    }
    if (user || user1) {
      toast.success("Login Successful");
      // console.log(user1);
      const url = "https://stock-world-server.onrender.com/login";
      axios
        .post(url, { email: user1?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("email", user1?.email);
          // console.log(data);
          navigate(from, { replace: true });
        })
        .catch(function (error) {
          toast.error(error.message);
          console.log(error);
        });
    }
    if (error || resetError) {
      return toast.error(error.message);
    }
  }, [error, from, loading, navigate, user, user1, resetError, loading1]);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
  };
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email address");
    }
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full">
        <figure className="lg:w-1/2">
          <img className="object-cover w-full h-full" src={login1} alt="Login illustration" />
        </figure>
        <div className="card-body lg:w-1/2 justify-center">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Welcome Back!
            </h2>
            <p className="text-base-content/70">Please sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
                className="input input-bordered input-primary w-full focus:input-primary"
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="input input-bordered input-primary w-full focus:input-primary"
              />
            </div>
            
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full hover:shadow-lg transition-all"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4 space-y-2">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <Link className="text-primary hover:text-primary-focus font-medium" to="/register">
                Create Account
              </Link>
            </p>
            <p className="text-sm">
              Forgot your password?{" "}
              <button 
                className="text-primary hover:text-primary-focus font-medium" 
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </p>
          </div>
          
          <div className="divider text-base-content/50">OR</div>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;
