import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import images from "../images/loginpic.jpg";
import { RiHospitalLine, RiMailLine, RiLockPasswordLine, RiLoginCircleLine } from 'react-icons/ri';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        throw new Error("User data not found");
      }

      const userData = userDoc.data();
      
      const userToStore = {
        uid: user.uid,
        email: user.email,
        role: userData.role,
        username: userData.username
      };
      
      localStorage.setItem("user", JSON.stringify(userToStore));
      
      if (userData.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Invalid email or password'
          : 'An error occurred during login. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                Welcome to Medicare
              </h1>
              <p className="text-teal-100 text-center max-w-md">
                Your trusted healthcare management system. Providing excellence in patient care and medical administration.
              </p>
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-2">Sign In</h2>
              <p className="text-gray-600">Access your medical dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200" role="alert">
                <p className="text-red-600 text-sm text-center" aria-live="assertive">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <RiMailLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                disabled={isLoading}
              >
                <RiLoginCircleLine className={`text-xl ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-teal-600 font-semibold hover:text-teal-700 focus:outline-none"
                    onClick={() => !isLoading && navigate("/signup")}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;