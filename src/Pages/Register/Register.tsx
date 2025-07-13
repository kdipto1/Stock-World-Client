import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import sign from "../../Images/Login/sign.svg";
import SocialLogin from "../Login/SocialLogin";
import LoadingSpinner from "../../components/LoadingSpinner";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      toast.success("Registration Successful! Please verify your email.");
      navigate(from, { replace: true });
    }
    if (error) {
      toast.error(error.message);
    }
  }, [error, from, navigate, user]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const email = event.currentTarget.email.value;
    createUserWithEmailAndPassword(email, password);
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

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-full">
              Register
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