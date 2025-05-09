import React, { useState,useEffect } from 'react';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
export const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });
 
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history("/");
    }
  }, [isLoggedIn, history]); 
  const handleChange = (e) => {

    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const { username, email, password } = data;

      if (!username || !email || !password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/v1/sign-in", data);
      console.log("Signup successful:", response.data);
      alert("Signup successful!");
      history("/login");

      // Optionally reset the form
      setData({ username: "", email: "", password: "" });

    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-gray-700 p-10 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-gray-600 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-600 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-600 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={data.password}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Sign Up
          </button>

          <span className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 text-2xl hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
