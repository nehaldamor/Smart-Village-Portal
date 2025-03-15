import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";
import axios from "axios";

const UserHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/schemes/all`);
        if (response.status === 200) {
          const data = response.data;
          setSchemes(data.schemes);
        }
      } catch (err) {
        setError("Failed to fetch schemes");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/userscheme/${id}`);
  };

  return (
    <>              
     <div className="px-6 py-8 min-h-screen w-screen bg-blue-50 overflow-hidden">
     
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 border-b pb-2">📜 Government Schemes</h2>
      {loading && <p className="text-center text-gray-600">Loading schemes...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <div key={scheme._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition duration-300 relative group">
              <h3 className="text-xl font-bold mb-2 text-blue-800">{scheme.title}</h3>
              <p className="text-gray-700 mb-2">{scheme.description}</p>
              <p className="text-sm text-gray-600 font-semibold">Category: {scheme.category}</p>
              <p className="text-sm text-gray-600 font-semibold">Status: {scheme.status}</p>
              <p className="text-sm text-gray-600 font-semibold">📅 Start: {new Date(scheme.startDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 font-semibold">⏳ End: {new Date(scheme.endDate).toLocaleDateString()}</p>
              <button 
                onClick={() => handleViewDetails(scheme._id)}
                className="mt-4 px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition w-full"
              >
                📄 View Details
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No schemes available</p>
        )}
      </div>
    </div>
    </>
  );
};

export default UserHomePage;