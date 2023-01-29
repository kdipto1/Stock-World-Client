import React, { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import sign from "../../Images/Login/sign.svg";
import SocialLogin from "../Login/SocialLogin";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      toast.error(error?.message);
    }
    if (user) {
      toast.success("Successfully Registered");
      navigate(from, { replace: true });
    }
  }, [error, from, loading, navigate, user]);
  const handleRegister = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <section className="h-screen container mx-auto mt-20">
      <div className="card lg:card-side bg-base-100 shadow-xl mx-auto">
        <figure>
          <img className="w-4/5" src={sign} alt="Album" />
        </figure>
        <div className="card-body my-auto text-center">
          <h2 className="card-title text-2xl font-bold mx-auto">
            Please Register
          </h2>
          {/* +++++++ */}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <input
              type="email"
              name="email"
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
              value="Register"
              className="btn btn-wide hover:btn-primary"
            />
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="text-primary"
              style={{ textDecoration: "none" }}
              to="/login"
            >
              Please Login
            </Link>{" "}
          </p>
          <hr className="w-50 mx-auto" />
          {/* +++++++ */}
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Register;
