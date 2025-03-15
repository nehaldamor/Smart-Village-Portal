import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router';

const AllNotices = () => {
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/notices/allnotice`);
            if (response.status === 201) {
                setNotices(response.data);
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const openModal = (notice) => {
        setSelectedNotice(notice);
        setTitle(notice.title);
        setDescription(notice.description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotice(null);
    };

    const handleUpdate = async () => {
        if (!selectedNotice) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${import.meta.env.VITE_URL}/notices/update/${selectedNotice._id}`, {
                title,
                description
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (response.status === 200) {
                fetchNotices();
                closeModal();
            }
        } catch (error) {
            console.error("Error updating notice:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 p-6">
            <Link className="p-2 px-4 bg-gray-300 text-blue-900 rounded-lg shadow-md hover:bg-gray-200" to='/admin-home'>Home</Link>
            <h2 className=" mt-2 text-3xl font-bold text-blue-900 text-center border-b-2 pb-2 mb-6">
                Government Notice Board
            </h2>
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-400">
                {notices.length === 0 ? (
                    <p className="text-gray-600 text-center">No notices available</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {notices.map((notice) => (
                            <div key={notice._id} className="bg-gray-100 flex justify-between p-4 rounded-lg shadow border border-gray-300">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-900">{notice.title}</h3>
                                    <p className="text-gray-700 mt-2">{notice.description}</p>
                                    <p className="text-sm text-gray-500 mt-2">Date: {new Date(notice.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => openModal(notice)}
                                        className="bg-blue-900 text-white flex items-center p-2 rounded-lg hover:bg-blue-800 transition"
                                    >
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-400">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">Update Notice</h2>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-900"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter new title"
                        />
                        <textarea
                            className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-900"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter new description"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
                            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllNotices;
