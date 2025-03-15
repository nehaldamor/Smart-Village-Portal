import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({});
  const categories = ["Education", "Health", "Employment", "Agriculture", "Infrastructure", "Other"];

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/schemes/${id}`);
        setScheme(response.data.scheme);
        setFormData(response.data.scheme);
      } catch (err) {
        setError("Failed to fetch scheme details");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemeDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_URL}/schemes/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScheme(formData);
      setActive(false);
    } catch (err) {
      console.error("Failed to update scheme", err);
    }
  };

  return (
    <div className="px-6 py-10 min-h-screen bg-gray-100 font-[Merriweather]">
      <header className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Scheme Details</h1>
        <button onClick={() => navigate(-1)} className="p-2 px-4 bg-white text-blue-900 rounded-lg shadow-md hover:bg-gray-200">Go Back</button>
      </header>

      <main className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {loading && <p className="text-center text-gray-600">Loading scheme details...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {scheme && (
          <div>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">{scheme.title}</h2>
            <p className="text-gray-700 text-center mb-6">{scheme.description}</p>
            <div className="border-t pt-4 space-y-2">
              <p><strong>Category:</strong> {scheme.category}</p>
              <p><strong>Status:</strong> {scheme.status}</p>
              <p><strong>Start Date:</strong> {new Date(scheme.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(scheme.endDate).toLocaleDateString()}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibilityCriteria}</p>
              <p><strong>Application Process:</strong> {scheme.applicationProcess}</p>
            </div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition" onClick={() => setActive(true)}>Update Scheme</button>
          </div>
        )}
      </main>

      {active && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Scheme</h2>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Title" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Description"></textarea>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mb-2">
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input type="date" name="startDate" value={formData.startDate.split('T')[0]} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="date" name="endDate" value={formData.endDate.split('T')[0]} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <textarea name="eligibilityCriteria" value={formData.eligibilityCriteria} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Eligibility Criteria"></textarea>
            <textarea name="applicationProcess" value={formData.applicationProcess} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Application Process"></textarea>
            <div className="flex justify-end mt-4">
              <button onClick={() => setActive(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleScheme;
