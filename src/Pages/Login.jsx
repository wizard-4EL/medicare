import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase login method
import { auth } from "../firebase/config"; // Import the Firebase Auth instance

import images from "../images/loginpic.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Firebase login function
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // User successfully logged in
        const user = userCredential.user;
        console.log("Logged in user:", user);

        // Store user information in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the dashboard
        navigate("/dashboard");
      } catch (err) {
        setError(err.message || "Failed to log in. Please try again.");
      }
    } else {
      setError("Please fill in all fields!");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl gap-8">
        {/* Left side with image */}
        <div
          className="hidden md:block bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${images})`,
            backgroundColor: "#f3f3f3", // Fallback background color
            height: "100%",
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold text-center">Welcome Back!</h1>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full p-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-4">MEDICARE</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to continue</p>

          {error && (
            <p className="text-red-500 text-center mb-4" aria-live="assertive">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
