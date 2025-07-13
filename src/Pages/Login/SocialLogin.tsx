// @ts-ignore
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import toast from "react-hot-toast";
import axios from "axios";

const SocialLogin = () => {
  const [user1, loading1] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (loading1) {
      return;
    }
    if (user || user1) {
      toast.success("Login Successful");
      // console.log(user1);
      const url = "https://stock-world-server.onrender.com/login";
      axios
        // @ts-ignore
        .post(url, { email: user?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          // @ts-ignore
          localStorage.setItem("email", user1?.email);
          // console.log(data);
          navigate(from, { replace: true });
        })
        .catch(function (error) {
          toast.error(error.message);
          console.log(error);
        });
    }
    if (loading) {
      return;
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [from, user, navigate, error, loading, loading1, user1]);
  return (
    <section className="w-full">
      <button
        onClick={() => signInWithGoogle()}
        disabled={loading || loading1}
        className="btn btn-outline btn-primary w-full gap-2 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading || loading1 ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-primary"></div>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        {loading || loading1 ? 'Signing in...' : 'Continue with Google'}
      </button>
    </section>
  );
};

export default SocialLogin;
