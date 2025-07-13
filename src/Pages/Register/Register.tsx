import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import sign from "../../Images/Login/sign.svg";
import SocialLogin from "../Login/SocialLogin";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      toast.success("Successfully Registered! Welcome to StockWorld!");
      navigate(from, { replace: true });
    }
  }, [error, from, loading, navigate, user]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    createUserWithEmailAndPassword(formData.email, formData.password);
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card lg:card-side bg-base-100 shadow-2xl border-0 overflow-hidden">
            <figure className="lg:w-1/2">
              <img className="w-full h-full object-cover" src={sign} alt="Registration illustration" />
            </figure>
            <div className="lg:w-1/2 card-body px-8 py-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Join StockWorld
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Create your account to get started</p>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text text-base font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      formErrors.name ? 'border-error' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && <span className="text-xs text-error mt-1">{formErrors.name}</span>}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-base font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      formErrors.email ? 'border-error' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && <span className="text-xs text-error mt-1">{formErrors.email}</span>}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text text-base font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter a password"
                      className={`input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.password ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-primary focus:outline-none"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formErrors.password && <span className="text-xs text-error mt-1">{formErrors.password}</span>}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="confirmPassword">
                    <span className="label-text text-base font-medium">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.confirmPassword ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-primary focus:outline-none"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formErrors.confirmPassword && <span className="text-xs text-error mt-1">{formErrors.confirmPassword}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-full text-white font-medium py-3 rounded-lg transition-all duration-200 ${
                    loading ? 'loading' : 'hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Register Now'}
                </button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    className="text-primary font-medium hover:underline transition-colors"
                    to="/login"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
              
              <div className="divider my-8 text-gray-400">OR</div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
