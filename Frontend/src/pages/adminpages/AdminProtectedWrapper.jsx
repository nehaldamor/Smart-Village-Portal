import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token'); // Removed `await`
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/admin-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_URL}/admins/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setIsLoading(false);
            }
        })
        .catch(err => {
            localStorage.removeItem('token');
            navigate('/admin-login');
        });
    }, [navigate]); // Removed `token` from dependencies

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AdminProtectedWrapper;
