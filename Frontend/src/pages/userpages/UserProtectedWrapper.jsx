import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!token) {
          
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_URL}/users/profile`, {
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
            navigate('/login');
        });
    }, [navigate]); // No token in dependency

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
