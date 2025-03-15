import React from "react";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useUser();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-800 overflow-hidden">
        <h2 className="text-xl font-semibold">No user logged in</h2>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-6 overflow-hidden">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
      <Link className="p-2 px-4 bg-gray-300 text-blue-900 rounded-lg shadow-md hover:bg-gray-200" to='/user-home'>Home</Link>
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">Profile Details</h1>
        <div className="flex items-center justify-center mb-4">
          <img className="h-22 w-22 rounded-full border-4 border-blue-900" 
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s" alt="User" />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">First Name</label>
            <p className="border p-2 rounded-md bg-gray-200">{user.fullname?.firstname}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Last Name</label>
            <p className="border p-2 rounded-md bg-gray-200">{user.fullname?.lastname}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <p className="border p-2 rounded-md bg-gray-200">{user.email}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Village</label>
            <p className="border p-2 rounded-md bg-gray-200">{user.village}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Phone</label>
            <p className="border p-2 rounded-md bg-gray-200">{user.phone}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to='/updateprofile' className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
