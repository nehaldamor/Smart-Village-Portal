import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SchemeById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/schemes/${id}`);
        setScheme(response.data.scheme);
      } catch (err) {
        setError("Failed to fetch scheme details");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemeDetails();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      {loading && <p className="text-center text-gray-700">Loading scheme details...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {scheme && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl p-6">
          <h2 className="text-2xl font-bold text-blue-900 text-center border-b pb-2 mb-4">{scheme.title}</h2>
          <p className="text-gray-800 mb-4">{scheme.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <p><strong>Category:</strong> {scheme.category}</p>
            <p><strong>Status:</strong> {scheme.status}</p>
            <p><strong>Start Date:</strong> {new Date(scheme.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(scheme.endDate).toLocaleDateString()}</p>
            <p className="md:col-span-2"><strong>Eligibility:</strong> {scheme.eligibilityCriteria}</p>
            <p className="md:col-span-2"><strong>Application Process:</strong> {scheme.applicationProcess}</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="mt-6 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SchemeById;
