import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { db,auth } from '../firebase/config';
import image from "../img/signUp.jpeg";

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '', // Phone number
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
      });
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[60%] lg:w-[50%] h-auto">
        <div className="w-[300px] h-[400px] flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <img className="w-full h-full object-cover rounded-md shadow-md" src={image} alt="Sign Up" />
        </div>
        <div className="max-w-[400px] w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">MEDICARE</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Username</label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Email</label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Phone Number</label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="number"
                value={number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Password</label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Confirm Password</label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              className="w-full h-12 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
              type="submit"
            >
              Sign Up
            </button>

            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <p>Already have an account?</p>
              <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
