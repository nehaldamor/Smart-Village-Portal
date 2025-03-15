import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated. Please log in.");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_URL}/complaints/all-complaints`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data.complaints || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const openUpdateModal = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setNewStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return alert("Please select a status!");
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_URL}/complaints/update/${selectedComplaint._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints((prev) =>
        prev.map((comp) =>
          comp._id === selectedComplaint._id ? { ...comp, status: newStatus } : comp
        )
      );
      alert("Status updated successfully!");
      closeModal();
    } catch (error) {
      alert("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen p-6 text-gray-900">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <Link className="p-2 px-4 ml-60  bg-gray-200 text-blue-900 rounded-lg shadow-md hover:bg-gray-200 sm:ml-0" to='/admin-home'>Home</Link>
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6 mt-5">All Complaints</h1>

        {loading && <p className="text-center text-yellow-500">Loading complaints...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && complaints.length > 0 ? (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
              >
                <h2 className="text-xl font-semibold text-blue-900">{complaint.category}</h2>
                <p className="text-gray-700 text-sm break-words">
                  {expanded[complaint._id] || complaint.description.length <= 100
                    ? complaint.description
                    : `${complaint.description.substring(0, 100)}...`}
                </p>
                {complaint.description.length > 100 && (
                  <button
                    className="text-blue-600 text-sm underline mt-1"
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [complaint._id]: !prev[complaint._id] }))
                    }
                  >
                    {expanded[complaint._id] ? "Read Less" : "Read More"}
                  </button>
                )}
                <p className="text-sm text-gray-600 mt-2">Date: {new Date(complaint.createdAt).toLocaleDateString()}</p>
                <p
                  className={`mt-2 font-semibold ${
                    complaint.status.toLowerCase() === "pending"
                      ? "text-yellow-600"
                      : complaint.status.toLowerCase() === "resolved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {complaint.status}
                </p>
                <button
                  onClick={() => openUpdateModal(complaint)}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900 mt-3"
                >
                  <FaEdit className="mr-2" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-500 mt-6">No complaints found.</p>
        )}
      </div>

      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Update Status</h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Complaint:</strong> {selectedComplaint.category}
            </p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className={`px-4 py-2 rounded-md text-white ${updating ? "bg-gray-600" : "bg-blue-700 hover:bg-blue-900"}`}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComplaints;