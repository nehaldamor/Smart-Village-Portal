import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { FaClipboardList, FaSearch, FaEdit, FaUser, FaUserEdit } from "react-icons/fa";

const AdminHome = () => {
  const [complaintId, setComplaintId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-7 h-screen flex flex-col items-center justify-center  bg-cover bg-center bg-[url(./src/assets/Homepg.jpg)]">
      <div className="bg-gray-200 shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Buttons for Admin Actions */}
        <div className="flex flex-col gap-4">
          {/* All Complaints */}
          <Link
            to='/allcomplaints'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            <FaClipboardList className="mr-2" /> View All Complaints
          </Link>

          {/* Profile */}
          <Link
            to='/admin-profile'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            <FaUser className="mr-2" /> Profile
          </Link>

          {/* Edit Profile */}
          <Link
            to='/updateadmin-profile'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> Edit Profile
          </Link>

          <Link
            to='/create-notice'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> Create Notice
          </Link>

          <Link
            to='/allnotice'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> Notices
          </Link>
          <Link
            to='/createscheme'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> create Scheme
          </Link>

          <Link
            to='/allschemes'
            className="bg-blue-600 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> All Scheme
          </Link>

          <Link
            to='/admin-logout'
            className="bg-red-500 flex items-center justify-center text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <FaUserEdit className="mr-2" /> Logout
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
