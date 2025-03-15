import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ViewSchemes = () => {
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
    navigate(`/schemes/${id}`);
  };

  return (
    <div className="px-6 py-8 min-h-screen w-screen bg-gray-100 overflow-hidden font-[Merriweather]">
      <header className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Government Schemes Portal</h1>
        <Link className="p-2 px-4 bg-white text-blue-900 rounded-lg shadow-md hover:bg-gray-200" to='/admin-home'>Home</Link>
      </header>

      <main className="mt-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6 uppercase">Available Schemes</h2>

        {loading && <p className="text-center text-gray-600">Loading schemes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.length > 0 ? (
            schemes.map((scheme) => (
              <div key={scheme._id} className="bg-white border-l-4 border-blue-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold text-blue-900 mb-3">{scheme.title}</h3>
                <p className="text-gray-700 mb-3">{scheme.description}</p>
                <p className="text-sm text-gray-600"><strong>Category:</strong> {scheme.category}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {scheme.status}</p>
                <p className="text-sm text-gray-600"><strong>Start:</strong> {new Date(scheme.startDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600"><strong>End:</strong> {new Date(scheme.endDate).toLocaleDateString()}</p>
                <button 
                  onClick={() => handleViewDetails(scheme._id)}
                  className="mt-4 px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition w-full"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500">No schemes available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewSchemes;