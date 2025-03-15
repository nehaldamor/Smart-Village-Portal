import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";
const UpdateProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLasntname] = useState('');
  const [village, setVillage] = useState("")
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
const {setUser}=useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated!");
      return;
    }

    try {
        const user={
            fullname:{
                firstname,
                lastname
            },
            village
        }
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/users/update-profile`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setUser(response.data.user)
        navigate("/profile")
        setMessage("✅ Profile updated successfully!");
      }
    } catch (error) {
      setMessage("❌ Failed to update profile!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      {/* Back to Home */}
      <div className="w-full max-w-lg mb-6 flex justify-start">
        <Link to="/user-home" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
           Home
        </Link>
      </div>

      <div className="w-full max-w-lg bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Profile</h2>

     
        {message && (
          <p className={`text-center p-2 rounded-md ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold mb-1">FirstName</label>
            <input
              type="text"
           
              value={firstname}
              onChange={(e)=>{setFirstname(e.target.value)}}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold mb-1">LastName</label>
            <input
              type="text"
            
              value={lastname}
              onChange={(e)=>{setLasntname(e.target.value)}}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Village</label>
            <input
              type="text"
              value={village}
              onChange={(e)=>{setVillage(e.target.value)}}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
