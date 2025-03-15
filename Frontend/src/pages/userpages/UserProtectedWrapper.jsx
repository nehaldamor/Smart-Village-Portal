import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Stored Token:", token);
        console.log("API URL:", import.meta.env.VITE_URL); // Debugging URL

        if (!token) {
            console.warn("No token found. Redirecting to login.");
            navigate('/admin-register');
            return;
        }

        axios.get(`${import.meta.env.VITE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("API Response:", response.data);
            if (response.status === 200) {
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.error("API Error:", err.response ? err.response.data : err);
            localStorage.removeItem('token');
            navigate('/admin-login');
        });
    }, [navigate]); // No token in dependency

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
