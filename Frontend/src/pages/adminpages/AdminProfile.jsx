import React from "react";
import { useAdmin } from "../../context/AdminContext";
import { Link } from "react-router";

const AdminProfile = () => {
  const { admin } = useAdmin();

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h2 className="text-2xl font-bold">No user logged in</h2>
      </div>
    );
  }
  return (
    <div className="h-screen overflow-hidden bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Government Admin Profile</h1>
          <p className="text-gray-700">Official Profile Information</p>
        </header>

        <div className="flex justify-center mb-4">
          <img
            className="h-32 w-32 rounded-full border-4 border-gray-300 shadow-md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s"
            alt="Admin Profile"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-800">First Name</label>
            <p className="border p-2 rounded-md bg-gray-100 text-gray-900">{admin.fullname?.firstname}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-800">Last Name</label>
            <p className="border p-2 rounded-md bg-gray-100 text-gray-900">{admin.fullname?.lastname}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-800">Email</label>
            <p className="border p-2 rounded-md bg-gray-100 text-gray-900">{admin.email}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-800">Village</label>
            <p className="border p-2 rounded-md bg-gray-100 text-gray-900">{admin.village}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-800">Phone</label>
            <p className="border p-2 rounded-md bg-gray-100 text-gray-900">{admin.phone}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link
            to='/admin-home'
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md"
          >
            Home
          </Link>
          <Link
            to='/updateadmin-profile'
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;