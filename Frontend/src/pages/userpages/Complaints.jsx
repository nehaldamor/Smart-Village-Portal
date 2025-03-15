import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editComplaint, setEditComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_URL}/complaints/user-complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data.complaints);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch complaints.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_URL}/complaints/delete-complaint/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
    } catch (err) {
      alert("Failed to delete complaint.");
    }
  };

  const handleEdit = (complaint) => {
    setEditComplaint({ ...complaint });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_URL}/complaints/update-complaint/${editComplaint._id}`,
        {
          category: editComplaint.category,
          description: editComplaint.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints((prev) =>
        prev.map((comp) => (comp._id === editComplaint._id ? { ...editComplaint } : comp))
      );
      setEditComplaint(null);
      alert("Complaint updated successfully!");
    } catch (err) {
      alert("Failed to update complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-serif">
      <div className="w-full max-w-4xl bg-white border border-gray-700 shadow-lg p-6 rounded-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-blue-900 uppercase">My Complaints</h1>
          <Link to="/user-home" className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900">
            Home
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-600">No complaints found.</p>
        ) : (
          <ul className="space-y-4">
            {complaints.map((complaint) => (
              <li key={complaint._id} className="bg-gray-200 p-4 rounded-lg border-l-4 border-blue-900">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">{complaint.category}</h2>
                    <p className="text-gray-800">{complaint.description}</p>
                    <p className="text-sm text-gray-600">📅 {new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                      complaint.status === "Resolved" ? "bg-green-600 text-white" :
                      complaint.status === "In-Progress" ? "bg-yellow-500 text-white" : "bg-red-600 text-white"
                    }`}>{complaint.status}</span>
                    <button onClick={() => handleEdit(complaint)} className="text-blue-700 hover:text-blue-900">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(complaint._id)} className="text-red-700 hover:text-red-900">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-center">
          <Link to="/addcomplaint" className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
            ➕ Add New Complaint
          </Link>
        </div>
      </div>

      {editComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Edit Complaint</h2>
            <label className="text-gray-700">Category:</label>
            <select
              className="w-full p-2 mb-2 bg-gray-100 border border-gray-400 rounded"
              value={editComplaint.category}
              onChange={(e) => setEditComplaint({ ...editComplaint, category: e.target.value })}
            >
              <option value="Water">Water</option>
              <option value="Road">Road</option>
              <option value="Electricity">Electricity</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>

            <label className="text-gray-700">Description:</label>
            <textarea
              className="w-full p-2 mb-4 bg-gray-100 border border-gray-400 rounded"
              value={editComplaint.description}
              onChange={(e) => setEditComplaint({ ...editComplaint, description: e.target.value })}
            />

            <div className="flex justify-between">
              <button onClick={handleUpdate} className="bg-blue-600 px-4 py-2 text-white rounded">Update</button>
              <button onClick={() => setEditComplaint(null)} className="bg-gray-500 px-4 py-2 text-white rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
