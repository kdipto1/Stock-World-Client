import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import toast from "react-hot-toast";
import axios from "axios";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (user) {
      toast.success("Login Successful");
      // console.log(user1);
      const url = "https://stock-world-server.herokuapp.com/login";
      axios
        .post(url, { email: user?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("email", user?.email);
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
  }, [from, user, navigate, error, loading]);
  return (
    <section>
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-wide hover:btn-primary"
      >
        {" "}
        Continue With google
      </button>
    </section>
  );
};

export default SocialLogin;
