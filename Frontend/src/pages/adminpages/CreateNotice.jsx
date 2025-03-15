import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const CreateNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const notice = { title, description };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/notices/create`,
        notice,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Notice created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("Error creating notice. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-white border-2 border-gray-400 p-6 rounded-lg shadow-lg w-full max-w-xl">
      <Link className="p-2 px-4 bg-gray-200 text-blue-900 rounded-lg shadow-md hover:bg-gray-200" to='/admin-home'>Home</Link>
        <h2 className="mt-3 text-3xl font-bold text-blue-900 text-center border-b-2 pb-2 mb-4">
          Government Notice Portal
        </h2>
        {message && (
          <p className={`text-center font-semibold ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-900 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter notice title"
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter notice description"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            Create Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;