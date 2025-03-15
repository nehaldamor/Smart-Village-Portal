import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/notices/allnotice`);
      if (response.status === 201) {
        setNotices(response.data);
      } else {
        throw new Error("Failed to fetch notices");
      }
    } catch (error) {
      setError("Failed to fetch notices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-900 text-white py-5 text-center shadow-md">
    
        <h1 className="text-3xl font-bold tracking-wide">Official Notices </h1>
  
      </header>

     
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md border border-gray-300 rounded-lg mt-6">
       

        {loading ? (
          <p className="text-gray-700 text-center font-medium">Loading notices...</p>
        ) : error ? (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-700 text-center font-medium">No notices available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-2 px-4 border border-gray-400">Sr. No.</th>
                  <th className="py-2 px-4 border border-gray-400">Title</th>
                  <th className="py-2 px-4 border border-gray-400">Description</th>
                  <th className="py-2 px-4 border border-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={index} className="text-gray-900 border border-gray-300 even:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-400 text-center">{index + 1}</td>
                    <td className="py-2 px-4 border border-gray-400 font-semibold">{notice.title}</td>
                    <td className="py-2 px-4 border border-gray-400">{notice.description}</td>
                    <td className="py-2 px-4 border border-gray-400 text-center">
                      {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-10">
        <p className="text-sm">© 2025 Government of India. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Notices;
