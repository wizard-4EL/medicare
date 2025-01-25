import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase login method
import { auth } from "../firebase/config"; // Import the Firebase Auth instance

import image from "../img/loginpic2.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (email && password) {
      try {
        // Firebase login function
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // User successfully logged in
        const user = userCredential.user;
        console.log("Logged in user:", user);

        // Optionally, you can store user information in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the dashboard
        navigate("/dashboard");
      } catch (err) {
        // Handle Firebase login errors
        setError(err.message || "Failed to log in. Please try again.");
      }
    } else {
      setError("Please fill in all fields!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left side with image */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
            {/* Optional: Add any content here */}
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-4">MEDICARE</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to continue</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
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
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
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
