import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { ImGoogle3 } from "react-icons/im";
import auth from '../../firebase.init';


const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    if (loading) {
    
      return;
    }
    if (error) {
      alert(error?.message);
    }
  }, [from, user, navigate, error, loading]);
  return (
    <section>
      <button
        onClick={() => signInWithGoogle()}
        className="btn"
      >
        {" "}
        <ImGoogle3 className="" />
        Google SignIn
      </button>
    </section>
  );
};

export default SocialLogin;