import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import images from "../images/signUp.jpeg";
import { 
  RiHospitalLine, 
  RiUserLine, 
  RiMailLine, 
  RiPhoneLine, 
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserAddLine
} from 'react-icons/ri';

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { username, email, password, confirmPassword, number } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        number,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      setSuccess("Account created successfully! Please login to continue.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
      });
    } catch (err) {
      setError(
        err.code === 'auth/email-already-in-use' 
          ? 'Email is already registered' 
          : 'An error occurred during registration'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left side with image */}
        <div className="hidden lg:block relative h-full min-h-[600px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${images})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-teal-800/90 flex flex-col items-center justify-center p-8">
              <RiHospitalLine className="text-6xl text-white mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4 text-center">
                Join Medicare
              </h1>
              <p className="text-teal-100 text-center max-w-md">
                Create your account to access our comprehensive healthcare management system.
              </p>
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full p-8 lg:p-12">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join our healthcare platform</p>
            </div>

            {(error || success) && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  error 
                    ? 'bg-red-50 border border-red-200 text-red-600' 
                    : 'bg-green-50 border border-green-200 text-green-600'
                }`}
                role="alert"
              >
                <p className="text-sm text-center">
                  {error || success}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <InputWithIcon
                  icon={<RiUserLine />}
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <InputWithIcon
                  icon={<RiMailLine />}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <InputWithIcon
                  icon={<RiPhoneLine />}
                  type="tel"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <div className="relative">
                  <InputWithIcon
                    icon={<RiLockPasswordLine />}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <InputWithIcon
                    icon={<RiLockPasswordLine />}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                disabled={isLoading}
              >
                <RiUserAddLine className={`text-xl ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-teal-600 font-semibold hover:text-teal-700"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;