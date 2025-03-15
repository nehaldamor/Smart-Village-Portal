import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddComplaint = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/complaints/file`,
        { category, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setMessage("Complaint submitted successfully!");
        setDescription("");
        setCategory("");
      }
    } catch (error) {
      setMessage("Failed to submit complaint!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">📜 File a Complaint</h2>
          <Link
            to="/user-home"
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            🏠 Home
          </Link>
        </div>

        {message && (
          <p
            className={`text-center p-2 rounded-md mb-4 font-semibold ${
              message.includes("succ") ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Road">🛣️ Road Repair</option>
              <option value="Water">🚰 Water Supply</option>
              <option value="Electricity">💡 Street Light</option>
              <option value="Education">🏫 Education</option>
              <option value="Health">🏥 Health</option>
              <option value="Other">📌 Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Explain your complaint in detail..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
          >
            📩 Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;