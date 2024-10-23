import React from 'react';
import { Link } from 'react-router-dom';
import image from "../img/signUp.jpeg"; 

function SignUp() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      {/* Container for Image and Form */}
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[60%] lg:w-[50%] h-auto">
        
        {/* Image */}
        <div className="w-[300px] h-[400px] flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <img className="w-full h-full object-cover rounded-md shadow-md" src={image} alt="Sign Up" />
        </div>

        {/* SignUp Form */}
        <div className="max-w-[400px] w-full">
          <form className="w-full">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">MEDICARE</h2>
            
            {/* Username Input */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Username</label>
              <input 
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="text" 
                placeholder="Enter your username"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Email</label>
              <input 
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="email" 
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Password</label>
              <input 
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="password" 
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-700">Confirm Password</label>
              <input 
                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="password" 
                placeholder="Confirm your password"
              />
            </div>

            {/* SignUp Button */}
            <button 
              className="w-full h-12 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            >
              Sign Up
            </button>

            {/* Sign-in Option */}
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
