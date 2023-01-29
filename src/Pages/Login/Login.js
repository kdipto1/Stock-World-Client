import React, { useEffect, useRef } from "react";
import SocialLogin from "./SocialLogin";
import login1 from "../../Images/Login/login1.svg";
import toast from "react-hot-toast";
import { sendEmailVerification } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useSendEmailVerification,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  const [sendEmailVerification, verifySending, verifyError] =
    useSendEmailVerification(auth);
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
    <section className="h-screen container mx-auto mt-20">
      <div className="card lg:card-side bg-base-100 shadow-xl mx-auto">
        <figure>
          <img className="" src={login1} alt="Album" />
        </figure>
        <div className="card-body my-auto text-center">
          <h2 className="card-title text-2xl font-bold mx-auto">
            Please Login
          </h2>
          {/* +++++++ */}
          <form onSubmit={handleLogin}>
            <input
              name="email"
              type="email"
              ref={emailRef}
              placeholder="Your Email"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <input
              type="submit"
              value="Login"
              className="btn hover:btn-primary btn-wide mt-2"
            />
          </form>
          <h1>
            Don't have an account, Please{" "}
            <Link className="text-primary" to="/register">
              Register
            </Link>{" "}
          </h1>
          <h1 className="">
            Forget password?{" "}
            <span className="text-primary" onClick={resetPassword}>
              Reset Password
            </span>
          </h1>
          {/* +++++++ */}
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;
