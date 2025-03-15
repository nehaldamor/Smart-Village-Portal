import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const userData = { email };
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/admins/forgot-password`,
        userData
      );

      if (response.status === 200) {
        console.log(response.data);
        navigate("/reset-admin-password");
      }
    } catch (error) {
      console.error("Forgot password failed:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "Invalid email. Please try again.");
    }

    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500  bg-cover bg-center">
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-black/50 p-6 sm:p-8 md:p-10 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-6">Forgot Password</h2>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {errorMessage && (
            <p className="text-red-400 text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 mt-8 w-full"
          >
            Send OTP
          </button>
        </form>

        <div className="mt-6 text-center text-gray-100">
          <p>
            Remember your password? 
            <Link to="/login" className="ml-2 text-blue-400 font-semibold hover:text-blue-300">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;