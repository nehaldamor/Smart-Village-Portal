import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token')); // Store token in state

    useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login...");
            navigate('/login');
            return;
        }

        const checkUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true // Ensure cookies are sent if needed
                });

                if (response.status === 200) {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Authentication failed, redirecting to login...");
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        checkUser();
    }, [token, navigate]); // Token added to dependencies

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
