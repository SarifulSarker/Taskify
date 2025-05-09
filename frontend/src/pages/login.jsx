import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { authActions } from "../store/auth";

export const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
 const history = useNavigate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history("/");
    }
  }, []); 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = data;

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/log-in",
        data
      );

      // Save token & id
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);

      // Update Redux state
      dispatch(authActions.login());

      // Clear input
      setData({ username: "", password: "" });

      alert("Login successful!");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-gray-700 p-10 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-gray-600 border border-gray-500 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.username}
              onChange={handleChange}
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
              value={data.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit + Signup Link */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
            >
              Login
            </button>
            <span className="text-sm">
              Not signed up?{" "}
              <Link
                to="/signup"
                className="text-blue-400 text-2xl hover:underline"
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
