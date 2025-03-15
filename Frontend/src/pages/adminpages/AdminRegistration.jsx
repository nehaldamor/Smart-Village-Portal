import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAdmin } from '../../Context/AdminContext';

const AdminRegistration = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [password, setPassword] = useState('');
  const { setAdmin } = useAdmin() || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAdmin = {
      fullname: { firstname, lastname },
      email,
      village,
      phone,
      password,
      secretKey
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/admins/register`, newAdmin);
      if (response.status === 200) {
        setAdmin(response.data.admin);
        localStorage.setItem("token",response.data.token)
        navigate("/admin-home");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden  flex items-center justify-center bg-[url(./src/assets/Homepg.jpg)] bg-cover bg-center">
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-black/60 p-6 sm:p-8 md:p-10 rounded-lg ">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-white mb-6">Admin Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input onChange={(e) => setFirstname(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={firstname} type="text" placeholder="Firstname" required />
            <input onChange={(e) => setLastname(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={lastname} type="text" placeholder="Lastname" required />
          </div>
          <input onChange={(e) => setEmail(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={email} type="email" placeholder="Email" required />
          <input onChange={(e) => setVillage(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={village} type="text" placeholder="Village" required />
          <input onChange={(e) => setSecretKey(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={secretKey} type="text" placeholder="Admin ID" required />
          <input onChange={(e) => setPhone(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={phone} type="text" placeholder="Phone" required />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full border-2 p-3 bg-transparent rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-400" value={password} type="password" placeholder="Password" required />

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-500 transition ">
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-gray-100">
          <p>
            Already have an account?  
            <Link to="/admin-login" className="ml-2 text-blue-400 font-semibold hover:text-blue-300">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
