import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const CreateScheme = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    eligibilityCriteria: "",
    applicationProcess: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.eligibilityCriteria.trim()) newErrors.eligibilityCriteria = "Eligibility criteria is required";
    if (!formData.applicationProcess.trim()) newErrors.applicationProcess = "Application process is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_URL}/schemes/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ text: "Scheme created successfully!", type: "success" });
      setFormData({
        title: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
        eligibilityCriteria: "",
        applicationProcess: "",
        status: "Active",
      });
      setErrors({});
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Something went wrong!", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 py-10 px-5 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
      <Link className="p-2 px-4 bg-gray-300 text-blue-900 rounded-lg shadow-md hover:bg-gray-200" to='/admin-home'>Home</Link>
        <h2 className="mt-3 text-3xl font-bold text-center text-blue-900 mb-6">Government Scheme Registration</h2>
        {message.text && (
          <div className={`p-3 mb-4 text-center rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-800">Title</label>
            <input type="text" name="title" className="w-full p-2 border rounded" value={formData.title} onChange={handleChange} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-800">Description</label>
            <textarea name="description" className="w-full p-2 border rounded" rows="3" value={formData.description} onChange={handleChange} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-800">Category</label>
            <select name="category" className="w-full p-2 border rounded" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {["Education", "Health", "Employment", "Agriculture", "Infrastructure", "Other"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-800">Start Date</label>
              <input type="date" name="startDate" className="w-full p-2 border rounded" value={formData.startDate} onChange={handleChange} />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-800">End Date</label>
              <input type="date" name="endDate" className="w-full p-2 border rounded" value={formData.endDate} onChange={handleChange} />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-800">Eligibility Criteria</label>
            <textarea name="eligibilityCriteria" className="w-full p-2 border rounded" rows="3" value={formData.eligibilityCriteria} onChange={handleChange} />
            {errors.eligibilityCriteria && <p className="text-red-500 text-sm">{errors.eligibilityCriteria}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-800">Application Process</label>
            <textarea name="applicationProcess" className="w-full p-2 border rounded" rows="3" value={formData.applicationProcess} onChange={handleChange} />
            {errors.applicationProcess && <p className="text-red-500 text-sm">{errors.applicationProcess}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-800">Status</label>
            <select name="status" className="w-full p-2 border rounded" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Creating..." : "Create Scheme"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateScheme;