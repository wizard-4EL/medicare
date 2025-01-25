import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from "../firebase/config";
import image from "../img/signUp.jpeg";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "", // Phone number
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { username, email, password, confirmPassword, number } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        number,
        createdAt: new Date().toISOString(),
      });

      setSuccess("User registered successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl gap-8">
        {/* Image Section */}
        <div className="w-full h-72 md:h-full">
          <img
            className="w-full h-full object-cover rounded-lg shadow-md"
            src={image}
            alt="Sign Up"
          />
        </div>

        {/* Form Section */}
        <div className="w-full mt-6 md:mt-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Create Your Account
            </h2>
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              className="w-full mt-6 h-12 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Sign Up
            </button>

            <div className="flex justify-center mt-4 text-sm text-gray-600">
              <p>Already have an account?</p>
              <Link to="/" className="ml-1 text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
