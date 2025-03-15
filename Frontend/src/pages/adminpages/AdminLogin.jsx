import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAdmin } = useAdmin();
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const adminData = { email, password };
      const response = await axios.post(`${import.meta.env.VITE_URL}/admins/login`, adminData);

      if (response.status === 201) {
        setAdmin(response.data.admin);
        setFail(false);
        localStorage.setItem('token', response.data.token);
        navigate('/admin-home');
      }
    } catch (error) {
      setFail(true);
      console.error("Login failed:", error.response?.data?.message || error.message);
    }

    setEmail('');
    setPassword('');
  };
  
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[url(./src/assets/Homepg.jpg)] bg-cover bg-center">
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-black/50 p-6 sm:p-8 md:p-10 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-6">Admin Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          
          {fail && (
            <div className='text-red-400 text-center'>
              <h1>Incorrect email or password</h1>
              <Link to='/forgot-admin-password' className='cursor-pointer text-blue-400 hover:text-blue-300'>Forgot password?</Link>
            </div>
          )}

          <button 
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 mt-8 w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-100">
          <p>
            Don't have an account?  
            <Link to="/admin-register" className="ml-2 text-blue-400 font-semibold hover:text-blue-300">Register</Link>
          </p>
          <p>
            Login as User?  
            <Link to="/register" className="ml-2 text-blue-400 font-semibold hover:text-blue-300">User</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
